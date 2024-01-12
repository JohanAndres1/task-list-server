const express = require('express');
const app = express();
const PORT = 3000;

// Lista de tareas
const tasks = [
  {
    id: '123456',
    isCompleted: false,
    description: 'Walk the dog',
  }
]

// Ruta para obtener la lista de tareas
app.get('/', (req, res) => {
  res.json(tasks);
})

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})