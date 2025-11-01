const express = require('express');
const cors = require('cors');
const tasksRoutes = require('./routes/tasks');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'server error' });
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

