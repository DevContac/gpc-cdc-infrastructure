package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"strconv"
	"sync"
	"time"

	"github.com/joho/godotenv"
)

// --------- CARGA DE VARIABLES .env SEGÚN EL ENTORNO ---------
func init() {
	env := os.Getenv("GO_ENV")
	if env == "" {
		env = os.Getenv("NODE_ENV")
	}
	if env == "" {
		env = "development"
	}
	file := fmt.Sprintf(".env.%s", env)
	if err := godotenv.Load(file); err != nil {
		log.Fatalf("No pude cargar %s: %v", file, err)
	}
	log.Printf("Entorno cargado: %s (%s)", env, file)
}

// --------- ESTRUCTURAS Y VARIABLES GLOBALES ---------
type StoreItem struct {
	Key       string `json:"key"`
	Value     string `json:"value"`
	ExpiresIn int    `json:"expiresIn,omitempty"` // en segundos
}

type StoreEntry struct {
	Value     string    `json:"value"`
	ExpiresAt time.Time `json:"expiresAt"`
}

type Config struct {
	DefaultExpiration time.Duration `json:"defaultExpiration"`
	MaxKeys           int           `json:"maxKeys"`
	CleanupInterval   time.Duration `json:"cleanupInterval"`
}

var (
	store             = make(map[string]StoreEntry)
	timeouts          = make(map[string]*time.Timer)
	mu                sync.Mutex
	defaultExpiration = 30 * time.Minute
	maxKeys           = 1000
	cleanupInterval   = 5 * time.Minute
	config            = &Config{}
)

func initDefaultExpiration() {
	if val := os.Getenv("DEFAULT_EXPIRATION"); val != "" {
		if seconds, err := strconv.Atoi(val); err == nil {
			defaultExpiration = time.Duration(seconds) * time.Second
		}
	}
	if val := os.Getenv("MAX_KEYS"); val != "" {
		if keys, err := strconv.Atoi(val); err == nil {
			maxKeys = keys
		}
	}
	if val := os.Getenv("CLEANUP_INTERVAL"); val != "" {
		if seconds, err := strconv.Atoi(val); err == nil {
			cleanupInterval = time.Duration(seconds) * time.Second
		}
	}
	
	// Inicializar config
	config.DefaultExpiration = defaultExpiration
	config.MaxKeys = maxKeys
	config.CleanupInterval = cleanupInterval
}

// --------- HANDLERS ORIGINALES ---------
func handleSet(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	var item StoreItem
	if err := json.NewDecoder(r.Body).Decode(&item); err != nil || item.Key == "" {
		http.Error(w, "Se requieren key y value válidos", http.StatusBadRequest)
		return
	}

	mu.Lock()
	// Verificar límite de claves
	if len(store) >= maxKeys && store[item.Key].Value == "" {
		mu.Unlock()
		http.Error(w, fmt.Sprintf("Límite máximo de claves alcanzado (%d)", maxKeys), http.StatusTooManyRequests)
		return
	}

	exp := defaultExpiration
	if item.ExpiresIn > 0 {
		exp = time.Duration(item.ExpiresIn) * time.Second
	}
	expAt := time.Now().Add(exp)

	store[item.Key] = StoreEntry{
		Value:     item.Value,
		ExpiresAt: expAt,
	}

	if t, ok := timeouts[item.Key]; ok {
		t.Stop()
	}

	timeouts[item.Key] = time.AfterFunc(exp, func() {
		mu.Lock()
		delete(store, item.Key)
		delete(timeouts, item.Key)
		mu.Unlock()
		log.Printf("Clave %s eliminada automáticamente", item.Key)
	})
	mu.Unlock()

	json.NewEncoder(w).Encode(map[string]string{
		"message": fmt.Sprintf("Clave %s guardada; se eliminará en %s", item.Key, exp),
	})
}

func handleGet(w http.ResponseWriter, r *http.Request) {
	key := r.URL.Path[len("/get/"):]
	mu.Lock()
	entry, ok := store[key]
	mu.Unlock()

	if !ok {
		http.Error(w, "Clave no encontrada", http.StatusNotFound)
		return
	}

	remaining := time.Until(entry.ExpiresAt).Round(time.Second)
	if remaining < 0 {
		remaining = 0
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"key":       key,
		"value":     entry.Value,
		"expiresIn": remaining.String(),
	})
}

func handleDelete(w http.ResponseWriter, r *http.Request) {
	key := r.URL.Path[len("/delete/"):]
	mu.Lock()
	_, ok := store[key]
	if ok {
		delete(store, key)
		if t, ok2 := timeouts[key]; ok2 {
			t.Stop()
			delete(timeouts, key)
		}
	}
	mu.Unlock()

	if !ok {
		http.Error(w, "Clave no encontrada", http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(map[string]string{
		"message": fmt.Sprintf("Clave %s eliminada con éxito", key),
	})
}

func handleAll(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	result := make(map[string]interface{})
	for key, entry := range store {
		remaining := time.Until(entry.ExpiresAt).Round(time.Second)
		if remaining < 0 {
			remaining = 0
		}
		result[key] = map[string]interface{}{
			"value":     entry.Value,
			"expiresIn": remaining.String(),
		}
	}
	json.NewEncoder(w).Encode(result)
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

// --------- NUEVOS HANDLERS ---------

// Handler para limpiar toda la memoria
func handleClear(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost && r.Method != http.MethodDelete {
		http.Error(w, "Método no permitido. Use POST o DELETE", http.StatusMethodNotAllowed)
		return
	}

	mu.Lock()
	// Detener todos los timers
	for _, timer := range timeouts {
		timer.Stop()
	}
	
	// Limpiar los mapas
	keysCount := len(store)
	store = make(map[string]StoreEntry)
	timeouts = make(map[string]*time.Timer)
	mu.Unlock()

	log.Printf("Memoria limpiada: %d claves eliminadas", keysCount)
	
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Memoria limpiada con éxito",
		"keysRemoved": keysCount,
	})
}

// Template HTML para el formulario de configuración
const configFormHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configuración del Servidor</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input[type="number"] { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        button { background-color: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background-color: #0056b3; }
        .current-config { background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
        .stats { background-color: #e9f7ef; padding: 15px; border-radius: 4px; margin-top: 20px; }
        .danger-zone { background-color: #f8d7da; padding: 15px; border-radius: 4px; margin-top: 20px; }
        .danger-button { background-color: #dc3545; }
        .danger-button:hover { background-color: #c82333; }
    </style>
</head>
<body>
    <h1>Configuración del Servidor de Cache</h1>
    
    <div class="current-config">
        <h3>Configuración Actual</h3>
        <p><strong>Expiración por defecto:</strong> {{.DefaultExpiration}}</p>
        <p><strong>Máximo de claves:</strong> {{.MaxKeys}}</p>
        <p><strong>Intervalo de limpieza:</strong> {{.CleanupInterval}}</p>
    </div>

    <div class="stats">
        <h3>Estadísticas</h3>
        <p><strong>Claves en memoria:</strong> {{.CurrentKeys}}</p>
        <p><strong>Uso de memoria:</strong> {{.MemoryUsage}}%</p>
    </div>

    <form method="POST" action="/config">
        <h3>Actualizar Configuración</h3>
        
        <div class="form-group">
            <label for="defaultExpiration">Expiración por defecto (segundos):</label>
            <input type="number" id="defaultExpiration" name="defaultExpiration" 
                   value="{{.DefaultExpirationSeconds}}" min="1" max="86400">
        </div>
        
        <div class="form-group">
            <label for="maxKeys">Máximo número de claves:</label>
            <input type="number" id="maxKeys" name="maxKeys" 
                   value="{{.MaxKeys}}" min="1" max="100000">
        </div>
        
        <div class="form-group">
            <label for="cleanupInterval">Intervalo de limpieza (segundos):</label>
            <input type="number" id="cleanupInterval" name="cleanupInterval" 
                   value="{{.CleanupIntervalSeconds}}" min="1" max="3600">
        </div>
        
        <button type="submit">Actualizar Configuración</button>
    </form>

    <div class="danger-zone">
        <h3>Zona Peligrosa</h3>
        <p>Esta acción eliminará todos los datos almacenados en memoria.</p>
        <button class="danger-button" onclick="clearMemory()">Limpiar Toda la Memoria</button>
    </div>

    <script>
        function clearMemory() {
            if (confirm('¿Estás seguro de que quieres eliminar todos los datos? Esta acción no se puede deshacer.')) {
                fetch('/clear', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => response.json())
                .then(data => {
                    alert(data.message + ' (' + data.keysRemoved + ' claves eliminadas)');
                    location.reload();
                })
                .catch(error => {
                    alert('Error al limpiar memoria: ' + error);
                });
            }
        }
    </script>
</body>
</html>
`

// Handler para mostrar y actualizar la configuración
func handleConfig(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		// Mostrar formulario de configuración
		tmpl := template.Must(template.New("config").Parse(configFormHTML))
		
		mu.Lock()
		currentKeys := len(store)
		mu.Unlock()
		
		data := struct {
			DefaultExpiration        time.Duration
			MaxKeys                  int
			CleanupInterval          time.Duration
			DefaultExpirationSeconds int
			CleanupIntervalSeconds   int
			CurrentKeys              int
			MemoryUsage              int
		}{
			DefaultExpiration:        defaultExpiration,
			MaxKeys:                  maxKeys,
			CleanupInterval:          cleanupInterval,
			DefaultExpirationSeconds: int(defaultExpiration.Seconds()),
			CleanupIntervalSeconds:   int(cleanupInterval.Seconds()),
			CurrentKeys:              currentKeys,
			MemoryUsage:              (currentKeys * 100) / maxKeys,
		}
		
		tmpl.Execute(w, data)
		
	} else if r.Method == "POST" {
		// Actualizar configuración
		r.ParseForm()
		
		var updated []string
		
		if expStr := r.FormValue("defaultExpiration"); expStr != "" {
			if exp, err := strconv.Atoi(expStr); err == nil && exp > 0 {
				defaultExpiration = time.Duration(exp) * time.Second
				updated = append(updated, fmt.Sprintf("Expiración por defecto: %s", defaultExpiration))
			}
		}
		
		if maxStr := r.FormValue("maxKeys"); maxStr != "" {
			if max, err := strconv.Atoi(maxStr); err == nil && max > 0 {
				maxKeys = max
				updated = append(updated, fmt.Sprintf("Máximo de claves: %d", maxKeys))
			}
		}
		
		if cleanupStr := r.FormValue("cleanupInterval"); cleanupStr != "" {
			if cleanup, err := strconv.Atoi(cleanupStr); err == nil && cleanup > 0 {
				cleanupInterval = time.Duration(cleanup) * time.Second
				updated = append(updated, fmt.Sprintf("Intervalo de limpieza: %s", cleanupInterval))
			}
		}
		
		log.Printf("Configuración actualizada: %v", updated)
		
		// Respuesta JSON para AJAX o redirección
		if r.Header.Get("Content-Type") == "application/json" {
			json.NewEncoder(w).Encode(map[string]interface{}{
				"message": "Configuración actualizada con éxito",
				"updated": updated,
			})
		} else {
			// Redirección después de POST
			http.Redirect(w, r, "/config", http.StatusSeeOther)
		}
		
	} else {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
	}
}

// Handler para obtener estadísticas
func handleStats(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	mu.Lock()
	currentKeys := len(store)
	
	// Calcular claves que expiran pronto (próximos 5 minutos)
	expiringSoon := 0
	for _, entry := range store {
		if time.Until(entry.ExpiresAt) < 5*time.Minute {
			expiringSoon++
		}
	}
	mu.Unlock()

	stats := map[string]interface{}{
		"currentKeys":       currentKeys,
		"maxKeys":          maxKeys,
		"memoryUsage":      float64(currentKeys) / float64(maxKeys) * 100,
		"defaultExpiration": defaultExpiration.String(),
		"cleanupInterval":  cleanupInterval.String(),
		"expiringSoon":     expiringSoon,
		"uptime":           time.Since(time.Now()).String(), // Placeholder - necesitarías guardar el tiempo de inicio
	}

	json.NewEncoder(w).Encode(stats)
}

// --------- MAIN ---------
func main() {
	initDefaultExpiration()

	// Endpoints originales
	http.HandleFunc("/health", handleHealth)
	http.HandleFunc("/set", handleSet)
	http.HandleFunc("/get/", handleGet)
	http.HandleFunc("/delete/", handleDelete)
	http.HandleFunc("/all", handleAll)
	
	// Nuevos endpoints
	http.HandleFunc("/clear", handleClear)
	http.HandleFunc("/config", handleConfig)
	http.HandleFunc("/stats", handleStats)

	portFlag := flag.String("port", "", "Puerto en el que corre el servidor (sobrescribe PORT env)")
	flag.Parse()

	port := *portFlag
	if port == "" {
		port = os.Getenv("PORT")
	}
	if port == "" {
		port = "3000"
	}
	
	log.Printf("Servidor corriendo en http://localhost:%s", port)
	log.Printf("Panel de configuración disponible en: http://localhost:%s/config", port)
	log.Printf("Estadísticas disponibles en: http://localhost:%s/stats", port)
	
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}