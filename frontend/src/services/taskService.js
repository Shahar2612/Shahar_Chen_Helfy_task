const API_URL = '/api/tasks';
//
export const fetchTasks = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('failed to fetch tasks');
  const result = await response.json();
  return result.data || [];
};
// create a new task
export const createTask = async (taskData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  if (!response.ok) throw new Error('failed to create task');
  const result = await response.json();
  return result.data;
};
// update a task
export const updateTask = async (taskId, taskData) => {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  if (!response.ok) throw new Error('failed to update task');
  const result = await response.json();
  return result.data;
};
// delete a task
export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('failed to delete task');
  const result = await response.json();
  return result.data;
};
// toggle task completion status
export const toggleTask = async (taskId) => {
  const response = await fetch(`${API_URL}/${taskId}/toggle`, {
    method: 'PATCH'
  });
  if (!response.ok) throw new Error('failed to toggle task');
  const result = await response.json();
  return result.data;
};

