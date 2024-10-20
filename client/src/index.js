import React from 'react';
import { createRoot } from 'react-dom/client'; // Using createRoot
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root container
root.render(<App />); // Render the App inside the root
