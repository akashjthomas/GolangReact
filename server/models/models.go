package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Todo struct {
	ID     primitive.ObjectID `json:"id" bson:"id"`
	Task   string             `json:"task" bson:"task"`
	Status bool               `json:"status" bson:"status"`
}
