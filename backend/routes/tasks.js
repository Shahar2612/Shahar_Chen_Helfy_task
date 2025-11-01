const express = require('express');
const router = express.Router();
const { validateTask } = require('../middleware/validation');

// data store
let tasks = [];
let nextId = 1;

// get all tasks
router.get('/', (req, res) => {
  res.json({ success: true, data: tasks, count: tasks.length });
});

// create a new task
router.post('/', (req, res) => {
  const errors = validateTask(req.body, false);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const newTask = {
    id: nextId++,
    title: req.body.title.trim(),
    description: req.body.description || '',
    completed: req.body.completed || false,
    createdAt: new Date(),
    priority: req.body.priority || 'medium'
  };

  tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask });
});

// update a task
router.put('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ success: false, message: 'task not found' });
  }

  const errors = validateTask(req.body, true);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  if (req.body.title !== undefined) task.title = req.body.title.trim();
  if (req.body.description !== undefined) task.description = req.body.description;
  if (req.body.completed !== undefined) task.completed = req.body.completed;
  if (req.body.priority !== undefined) task.priority = req.body.priority;

  res.json({ success: true, data: task });
});

// delete a task
router.delete('/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ success: false, message: 'task not found' });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.json({ success: true, data: deletedTask });
});

// toggle task completion status
router.patch('/:id/toggle', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ success: false, message: 'task not found' });
  }

  task.completed = !task.completed;
  res.json({ success: true, data: task });
});

module.exports = router;

