const express = require('express');
const app = express();
const PORT = 3000;

// Importacion de archivos
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

// Uso de los routers
app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);

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