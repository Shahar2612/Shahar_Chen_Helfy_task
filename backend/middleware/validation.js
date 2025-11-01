// validate task data
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

module.exports = { validateTask };

