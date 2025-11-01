const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// data store
let tasks = [];
let nextId = 1;

// function to validate task data
const validateTask = (data, isUpdate = false) => {
  const errors = [];

  if (!isUpdate || data.title !== undefined) {
    if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
      errors.push('title is required');
    }
  }

  if (data.description !== undefined && typeof data.description !== 'string') {
    errors.push('description must be a string');
  }

  if (data.completed !== undefined && typeof data.completed !== 'boolean') {
    errors.push('completed must be a boolean');
  }

  if (data.priority !== undefined && !['low', 'medium', 'high'].includes(data.priority)) {
    errors.push('priority must be low, medium, or high');
  }

  return errors;
};

// get all tasks
app.get('/api/tasks', (req, res) => {
  res.json({ success: true, data: tasks, count: tasks.length });
});

// create a new task
app.post('/api/tasks', (req, res) => {
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
app.put('/api/tasks/:id', (req, res) => {
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
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ success: false, message: 'task not found' });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.json({ success: true, data: deletedTask });
});

// toggle task completion status
app.patch('/api/tasks/:id/toggle', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ success: false, message: 'task not found' });
  }

  task.completed = !task.completed;
  res.json({ success: true, data: task });
});

// handle 404 errors
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'not found' });
});

// handle server errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'server error' });
});

// listen for requests
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

