const express = require('express')
const router = express.Router()

let tasks = [
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

// Ruta para crear una nueva tarea (POST)
router.post('/create-task', (req, res) => {
  const { description } = req.body
  const newTask = {
    id: Date.now().toString(),
    isCompleted: false,
    description
  }

  tasks.push(newTask)
  res.json(newTask)
})

// Ruta para eliminar una tarea (DELETE)
router.delete('/delete-task/:taskId', (req, res) => {
  const taskId = req.params.taskId
  tasks = tasks.filter(task => task.id !== taskId)
  res.json({ message: 'Task deleted successfully' })
})

// Ruta para actualizar una tarea (PUT o PATCH)
router.put('/update-task/:taskId', (req, res) => {
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

  res.json({ message: 'Task updated successfully' })
})

module.exports = router