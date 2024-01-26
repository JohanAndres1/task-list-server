const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const app = express()
const PORT = 3000

dotenv.config()

// Importacion de archivos
const listViewRouter = require('./list-view-router')
const listEditRouter = require('./list-edit-router')

// Uso de los routers
app.use('/list-view', listViewRouter)
app.use('/list-edit', listEditRouter)

// Middleware para parsear el cuerpo de la solicitud
app.use(express.json())

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
  res.json(tasks)
})

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

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})