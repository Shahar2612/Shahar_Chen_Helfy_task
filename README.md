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

### running the application

1. start the backend server (from `backend/` directory):
```bash
npm start
```
backend runs on http://localhost:4000

2. start the frontend (from `frontend/` directory):
```bash
npm start
```
frontend runs on http://localhost:3000

## features

- **endless carousel**: smooth infinite scrolling task display
- **task management**: create, read, update, and delete tasks
- **priority levels**: high, medium, and low priority indicators
- **filtering**: filter tasks by completion status
- **responsive design**: friendly interface

## API endpoints

- `GET /api/tasks` - get all tasks
- `POST /api/tasks` - create a new task
- `PUT /api/tasks/:id` - update a task
- `DELETE /api/tasks/:id` - delete a task
- `PATCH /api/tasks/:id/toggle` - toggle task completion

