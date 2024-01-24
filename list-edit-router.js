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

// Middleware para manejar errores en list-edit-router
function errorHandlerEditRouter(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    // a - Error de solicitud POST o PUT con cuerpo vacío
    return res.status(400).json({ error: 'Cuerpo de la solicitud vacío.' })
  } else if (err instanceof ValidationError) {
    // b - Error de solicitud POST o PUT con información no válida o atributos faltantes
    return res.status(400).json({ error: 'Información no válida o atributos faltantes.' })
  }

  next()
}

router.use(errorHandlerEditRouter)

// Ruta para crear una nueva tarea (POST)
router.post('/create-task', (req, res) => {
  const { description } = req.body
  if (!description) {
    return res.status(400).json({ error: 'La descripción de la tarea es obligatoria.' })
  }

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