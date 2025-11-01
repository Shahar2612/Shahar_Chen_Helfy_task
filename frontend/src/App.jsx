import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import * as taskService from './services/taskService';
import './styles/App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    let filtered = tasks;
    if (filter === 'completed') {
      filtered = tasks.filter(t => t.completed);
    } else if (filter === 'pending') {
      filtered = tasks.filter(t => !t.completed);
    }
    setFilteredTasks(filtered);
  }, [tasks, filter]);
// fetch tasks from API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
      console.error('error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // create a new task
  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
      alert('failed to create task');
    }
  };

  // update a task
  const handleUpdateTask = async (taskId, taskData) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, taskData);
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
      setShowForm(false);
      setEditingTask(null);
    } catch (err) {
      setError(err.message);
      alert('failed to update task');
    }
  };

  // delete a task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('are you sure you want to delete this task?')) {
      return;
    }
    try {
      await taskService.deleteTask(taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
    } catch (err) {
      setError(err.message);
      alert('failed to delete task');
    }
  };

  // toggle task completion status
  const handleToggleTask = async (taskId) => {
    try {
      const toggledTask = await taskService.toggleTask(taskId);
      setTasks(prev => prev.map(t => t.id === taskId ? toggledTask : t));
    } catch (err) {
      setError(err.message);
      alert('failed to toggle task');
    }
  };

  // edit a task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // submit form
  const handleFormSubmit = (taskData) => {
    if (editingTask) {
      handleUpdateTask(editingTask.id, taskData);
    } else {
      handleCreateTask(taskData);
    }
  };

  // cancel form
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <button 
          className="btn-add-task"
          onClick={() => setShowForm(true)}
        >
          + New Task
        </button>
      </header>

      {error && (
        <div className="error-message">
          Error: {error}
          <button onClick={fetchTasks}>Retry</button>
        </div>
      )}

      <TaskFilter filter={filter} onFilterChange={setFilter} />

      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
}

export default App;

