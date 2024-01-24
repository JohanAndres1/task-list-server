const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json())

// Importacion de archivos
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

// Middleware para gestionar métodos HTTP válidos
function validateHttpMethod(req, res, next) {
    const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];

    if (!validMethods.includes(req.method)) {
        // Error si el método HTTP no es válido
        return res.status(400).json({ error: 'Método HTTP no válido.' });
    }

    next();
}

// Implementar el middleware a nivel de aplicación
app.use(validateHttpMethod);

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