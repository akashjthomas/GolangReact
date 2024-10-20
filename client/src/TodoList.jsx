import React, { useState, useEffect } from 'react'; 
import { Header, Input } from 'semantic-ui-react';

function TodoList() {
  const [task, setTask] = useState(""); // Hook for task input
  const [items, setItems] = useState([]); // Hook for storing tasks

  useEffect(() => {
    getTask();
  }, []);

  // Handles input changes
  const onChange = (e) => {
    setTask(e.target.value);
  };

  // Handles form submission
  const onSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      setItems([...items, task]); // Add task to items
      setTask(""); // Clear input after submission
    }
  };

  // Fetches existing tasks (placeholder function for now)
  const getTask = () => {
    // Future task fetching logic can go here
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
        </form>
      </div>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
