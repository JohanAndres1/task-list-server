const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const app = express()
const PORT = 3000

dotenv.config()

// Importación de archivos
const listViewRouter = require('./list-view-router')
const listEditRouter = require('./list-edit-router')

// Uso de los routers
app.use('/list-view', listViewRouter)
app.use('/list-edit', listEditRouter)

// Lista de tareas
let tasks = [
  {
    id: '123456',
    isCompleted: false,
    description: 'Walk the dog',
  }
]

// Middleware para parsear el cuerpo de la solicitud
app.use(express.json())

// Ruta para autenticación (POST)
app.post('/login', (req, res) => {
  const { username, password } = req.body

  const user = users.find(u => u.username === username && u.password === password)

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  // Crear y firmar el token JWT
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' })

  res.json({ token })
})

// Ruta protegida
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route.' })
})

// Función para verificar el token
function authenticateToken(req, res, next) {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' })
    }

    req.user = user
    next()
  })
}

// Crear una nueva tarea
app.post('/tasks', (req, res) => {
  const { description } = req.body

  const newTask = {
    id: Date.now().toString(),
    isCompleted: false,
    description
  }

  tasks.push(newTask)
  res.status(201).json(newTask)
})

// Listar todas las tareas
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks)
})

// Obtener una sola tarea
app.get('/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId
  const task = tasks.find(t => t.id === taskId)

  if (!task) {
    return res.status(404).json({ message: 'Task not found' })
  }

  res.status(200).json(task)
})

// Actualizar una tarea
app.put('/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId
  const { isCompleted, description } = req.body

  tasks = tasks.map(task => {
    if (task.id === taskId) {
      return {
        ...task,
        isCompleted: isCompleted !== undefined ? isCompleted : task.isCompleted,
        description: description || task.description
      }
    }
    return task
  })

  res.status(200).json({ message: 'Task updated successfully' })
})

// Eliminar una tarea
app.delete('/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId
  tasks = tasks.filter(task => task.id !== taskId)
  res.status(200).json({ message: 'Task deleted successfully' })
})

// Listar tareas completas
app.get('/tasks/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.isCompleted)
  res.status(200).json(completedTasks)
})

// Listar tareas incompletas
app.get('/tasks/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.isCompleted)
  res.status(200).json(incompleteTasks)
})

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})