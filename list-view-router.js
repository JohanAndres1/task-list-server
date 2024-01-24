const express = require('express')
const router = express.Router()

const tasks = [
  {
    id: '123456',
    isCompleted: false,
    description: 'Walk the dog'
  },
  {
    id: '789012',
    isCompleted: true,
    description: 'Complete coding assignment'
  }
]

// Middleware para gestionar parámetros correctos en list-view-router
function validateParameters(req, res, next) {
  const { param1, param2 } = req.params

  // Verificar si los parámetros son correctos
  if (!param1 && !param2) {
    // Error si los parámetros no son correctos
    return res.status(400).json({ error: 'Al menos uno de los parámetros es necesario.' })
  }

  next()
}

// Implementar el middleware en el router list-view-router
router.use(validateParameters)

// Ruta para listar tareas completas
router.get('/completed-tasks', (req, res) => {
  const completedTasks = tasks.filter(task => task.isCompleted)
  res.json(completedTasks)
})

// Ruta para listar tareas incompletas
router.get('/incomplete-tasks', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.isCompleted)
  res.json(incompleteTasks)
})

module.exports = router