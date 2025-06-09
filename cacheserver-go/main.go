package main

import (
	"encoding/json"
	"flag"
	"fmt"
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

var (
	store          = make(map[string]StoreEntry)
	timeouts       = make(map[string]*time.Timer)
	mu             sync.Mutex
	defaultExpiration = 30 * time.Minute
)

func initDefaultExpiration() {
	if val := os.Getenv("DEFAULT_EXPIRATION"); val != "" {
		if seconds, err := strconv.Atoi(val); err == nil {
			defaultExpiration = time.Duration(seconds) * time.Second
		}
	}
}

// --------- HANDLERS ---------
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

	exp := defaultExpiration
	if item.ExpiresIn > 0 {
		exp = time.Duration(item.ExpiresIn) * time.Second
	}
	expAt := time.Now().Add(exp)

	mu.Lock()
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

// --------- MAIN ---------
func main() {
	initDefaultExpiration()

	http.HandleFunc("/health", handleHealth)
	http.HandleFunc("/set", handleSet)
	http.HandleFunc("/get/", handleGet)
	http.HandleFunc("/delete/", handleDelete)
	http.HandleFunc("/all", handleAll)

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
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
