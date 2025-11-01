import React from 'react';
import '../styles/TaskFilter.css';
// filter tasks based on selected filter
const TaskFilter = ({ filter, onFilterChange }) => {
  const filters = [
    { value: 'all', label: 'all' },
    { value: 'completed', label: 'completed' },
    { value: 'pending', label: 'pending' }
  ];

  return (
    <div className="task-filter">
      {filters.map((f) => (
        <button
          key={f.value}
          className={`filter-btn ${filter === f.value ? 'active' : ''}`}
          onClick={() => onFilterChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;

