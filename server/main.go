package main

import (
	"fmt"
	"log"
	"net/http"
	"server/router"
)

func main() {
	r := router.Router()
	fmt.Println("the server running @ 9000")
	log.Fatal(http.ListenAndServe(":9000", r))
}
