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