# task manager

full-stack task management application with React frontend and Express.js backend.

## project structure

```
helfy/
├── backend/          # express.js API server
│   ├── routes/      # API route handlers
│   ├── middleware/  # custom middleware
│   └── server.js    # main server file
│
└── frontend/        # react application
    ├── public/      # static assets
    └── src/         # react source code
        ├── components/  # react components
        ├── services/    # API service layer
        └── styles/      # CSS stylesheets
```

## getting started

### prerequisites

- Node.js (v14 or higher)
- npm or yarn

### installation

1. install backend dependencies:
```bash
cd backend
npm install
```

2. install frontend dependencies:
```bash
cd ../frontend
npm install
```

### running the Application

1. start the backend server (from `backend/` directory):
```bash
npm start
```
backend runs on http://localhost:4000

2. start the frontend (from `frontend/` directory):
```bash
npm run dev
```
frontend runs on http://localhost:3000

## Features

- **endless carousel**: smooth infinite scrolling task display
- **yask management**: create, read, update, and delete tasks
- **priority levels**: high, medium, and low priority indicators
- **filtering**: milter tasks by completion status
- **responsive design**: mobile-friendly interface

## API endpoints

- `GET /api/tasks` - get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - update a task
- `DELETE /api/tasks/:id` - delete a task
- `PATCH /api/tasks/:id/toggle` - toggle task completion

