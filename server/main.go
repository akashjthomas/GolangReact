package main

import (
	"fmt"
	"log"
	"net/http"
	"server/router"

	"github.com/rs/cors"
)

func main() {
	r := router.Router()

	// CORS middleware configuration
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"}, // Allow your frontend origin
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})

	// Wrap the router with CORS handler
	handler := c.Handler(r)

	fmt.Println("the server running @ 9000")
	log.Fatal(http.ListenAndServe(":9000", handler))
}
