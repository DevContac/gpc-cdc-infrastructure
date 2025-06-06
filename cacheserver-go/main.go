// main.go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/joho/godotenv"
)

// --------- CARGA DE VARIABLES .env SEGÚN EL ENTORNO ---------
func init() {
	env := os.Getenv("GO_ENV") // usa GO_ENV, pero acepta NODE_ENV si ya lo tienes en tu shell
	if env == "" {
		env = os.Getenv("NODE_ENV")
	}
	if env == "" {
		env = "development" // valor por defecto
	}

	file := fmt.Sprintf(".env.%s", env)
	if err := godotenv.Load(file); err != nil {
		log.Fatalf("No pude cargar %s: %v", file, err)
	}
	log.Printf("Entorno cargado: %s (%s)", env, file)
}

// --------- ESTRUCTURAS Y VARIABLES GLOBALES ---------
type StoreItem struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

var (
	store    = make(map[string]string)   // almacén en memoria
	timeouts = make(map[string]*time.Timer)
	mu       sync.Mutex                  // protege store + timeouts
)

// --------- HANDLERS HTTP ---------
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
	store[item.Key] = item.Value

	// Si ya había timer, cancélalo
	if t, ok := timeouts[item.Key]; ok {
		t.Stop()
	}

	// Nuevo temporizador de 30 min
	timeouts[item.Key] = time.AfterFunc(30*time.Minute, func() {
		mu.Lock()
		delete(store, item.Key)
		delete(timeouts, item.Key)
		mu.Unlock()
		log.Printf("Clave %s eliminada automáticamente", item.Key)
	})
	mu.Unlock()

	json.NewEncoder(w).Encode(map[string]string{
		"message": fmt.Sprintf("Clave %s guardada; se eliminará en 30 minutos", item.Key),
	})
}

func handleGet(w http.ResponseWriter, r *http.Request) {
	key := r.URL.Path[len("/get/"):]
	mu.Lock()
	value, ok := store[key]
	mu.Unlock()

	if !ok {
		http.Error(w, "Clave no encontrada", http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(map[string]string{"key": key, "value": value})
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

// --------- MAIN ---------
func main() {
	http.HandleFunc("/set", handleSet)
	http.HandleFunc("/get/", handleGet)       // nota la barra final
	http.HandleFunc("/delete/", handleDelete) // nota la barra final

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	log.Printf("Servidor corriendo en http://localhost:%s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
