import React, { useState, useEffect } from 'react'; 
import { Header, Input, Button, List } from 'semantic-ui-react';

let endpoint = "http://localhost:9000"; 

function TodoList() {
  const [task, setTask] = useState(""); // Hook for task input
  const [items, setItems] = useState([]); // Hook for storing tasks
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    getTask(); // Fetch tasks when the component mounts
  }, []);
  
  // Handles input changes
  const onChange = (e) => {
    setTask(e.target.value);
  };

  // Handles form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    if (task.trim()) {
      try {
        setLoading(true); // Start loading
        const response = await fetch(`${endpoint}/api/tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task }),
        });
        if (response.ok) {
          getTask(); // Fetch updated tasks after submitting
          setTask(""); // Clear input after submission
        }
      } catch (error) {
        console.error("Error creating task:", error);
        setError("Error creating task"); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  // Fetches existing tasks from the backend
  const getTask = async () => {
    try {
      const response = await fetch(`${endpoint}/api/tasks`); // Note the plural 'tasks'
      const data = await response.json();
      // Ensure data is an array before setting it
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  
  // Handles task completion
  const completeTask = async (id) => {
    try {
      await fetch(`${endpoint}/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      getTask(); // Refresh tasks after completing
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  // Handles task deletion
  const deleteTask = async (id) => {
    try {
      await fetch(`${endpoint}/api/deleteTask/${id}`, {
        method: "DELETE",
      });
      getTask(); // Refresh tasks after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handles deletion of all tasks
  const deleteAllTasks = async () => {
    try {
      await fetch(`${endpoint}/api/deleteAllTasks`, {
        method: "DELETE",
      });
      getTask(); // Refresh tasks after deletion
    } catch (error) {
      console.error("Error deleting all tasks:", error);
    }
  };

  return (
    <div className="row">
      <Header as="h2" color="yellow">ToDoList</Header>

      <div className="row">
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            name="task"
            onChange={onChange}
            value={task}
            fluid
            placeholder="Create task"
          />
          <Button type="submit" color="yellow" disabled={loading}>
            {loading ? "Adding Task..." : "Add Task"} {/* Submit button */}
          </Button>
        </form>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error if any */}

      <List divided relaxed>
  {Array.isArray(items) && items.length === 0 && !loading && <p>No tasks available</p>}
  {Array.isArray(items) && items.map((item) => (
    <List.Item key={item.id}> {/* Assuming each item has a unique 'id' */}
      <List.Content>
        <List.Header>{item.task}</List.Header> {/* Render task name */}
        <Button onClick={() => completeTask(item.id)} color="green">Complete</Button>
        <Button onClick={() => deleteTask(item.id)} color="red">Delete</Button>
      </List.Content>
    </List.Item>
  ))}
</List>

      <Button onClick={deleteAllTasks} color="red">Delete All Tasks</Button> {/* Delete all tasks button */}
    </div>
  );
}

export default TodoList;
