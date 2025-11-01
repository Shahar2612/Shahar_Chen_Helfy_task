import React from 'react';
import '../styles/TaskItem.css';
// display task item
const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };
// format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <div className="task-priority">
          <span 
            className="priority-badge" 
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {task.priority}
          </span>
        </div>
        <div className="task-actions">
          <button 
            className="btn-toggle"
            onClick={() => onToggle(task.id)}
            title={task.completed ? 'mark as incomplete' : 'mark as complete'}
          >
            {task.completed ? '✓' : '○'}
          </button>
          <button 
            className="btn-edit"
            onClick={() => onEdit(task)}
            title="edit task"
          >
            ✎
          </button>
          <button 
            className="btn-delete"
            onClick={() => onDelete(task.id)}
            title="delete task"
          >
            ×
          </button>
        </div>
      </div>
      <h3 className="task-title">{task.title}</h3>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      <div className="task-footer">
        <span className="task-date">{formatDate(task.createdAt)}</span>
        {task.completed && <span className="task-completed-badge">Completed</span>}
      </div>
    </div>
  );
};

export default TaskItem;

