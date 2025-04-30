
# Task Management Application

A full-stack task management application built with React and TypeScript that allows users to manage their daily tasks efficiently.

## Features

- **User Authentication**: 
  - Register new account with email/password
  - Login with existing credentials
  - Secure user sessions
  
- **Task Management**: 
  - Create new tasks with title, description and priority
  - View all tasks in an organized list
  - Mark tasks as complete/incomplete
  - Delete unwanted tasks
  - Set priority levels (Low, Medium, High)
  
- **Task Organization**:
  - Filter tasks by status (All, Active, Completed)
  - Tasks sorted by creation date
  - Visual indicators for task priority

## Tech Stack

### Frontend
- React 18 with TypeScript
- React Router for navigation
- React Context API for state management
- Tailwind CSS for styling
- Shadcn UI components
- React Query for data fetching

### Backend
This version uses browser localStorage for data persistence, simulating a backend. In a production environment, you would replace these implementations with real API calls to:
- A Node.js/Express backend
- A database like PostgreSQL or MongoDB
- Authentication service (like Firebase Auth, Auth0, etc.)

## Architecture

The application follows a component-based architecture with clear separation of concerns:

- **Contexts**: Global state management using React Context API
  - `AuthContext`: Manages user authentication state
  - `TaskContext`: Manages tasks data and operations

- **Components**: Reusable UI components organized by feature
  - `auth/`: Authentication components (login/register forms)
  - `layout/`: Layout components (header, app layout)
  - `tasks/`: Task-specific components (task form, list, filters)
  - `ui/`: Reusable UI components (buttons, inputs, etc.)

- **Hooks**: Custom React hooks
  - `useForm`: Form handling with validation
  - `useToast`: Toast notification system

- **Pages**: Main application pages
  - `Index`: Main dashboard page
  - `NotFound`: 404 error page

## Database Schema

While the current implementation uses localStorage, the data structure is designed to map easily to a database schema:

### User
- `id`: String (UUID, primary key)
- `name`: String
- `email`: String (unique)
- `password`: String (hashed)
- `createdAt`: Date

### Task
- `id`: String (UUID, primary key)
- `userId`: String (foreign key -> User.id)
- `title`: String
- `description`: String
- `isComplete`: Boolean
- `priority`: Enum ('low', 'medium', 'high')
- `createdAt`: Date

## Setup Instructions

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Frontend Setup
1. Clone the repository
   ```bash
   git clone <repository-url>
   cd task-management-app
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

### Backend Setup (For future implementation)

To implement a real backend:

1. Create a new directory for your backend
   ```bash
   mkdir task-api
   cd task-api
   ```

2. Initialize a new Node.js project
   ```bash
   npm init -y
   ```

3. Install required dependencies
   ```bash
   npm install express cors mongoose dotenv bcrypt jsonwebtoken
   npm install -D typescript ts-node nodemon @types/express @types/node
   ```

4. Set up your database (MongoDB example)
   ```bash
   # Create a .env file with your MongoDB connection string
   echo "MONGODB_URI=mongodb://localhost:27017/taskapp" > .env
   echo "JWT_SECRET=your_jwt_secret" >> .env
   ```

5. Create your schema models and API routes (examples in future documentation)

6. Update the frontend context files to use API calls instead of localStorage

## Running Locally

### Development Mode
```bash
# In the frontend directory
npm run dev
```

### Production Build
```bash
# Create production build
npm run build

# Serve the build (requires a static server)
npm install -g serve
serve -s dist
```

## Test Users

For testing purposes, you can use these pre-configured accounts:

1. **Regular User**
   - Email: demo@example.com
   - Password: password

2. **Admin User** 
   - Email: admin@example.com
   - Password: password

## Future Enhancements

- Real backend API implementation
- Due dates for tasks
- Task categories/tags
- Task search functionality
- Task sharing with other users
- Email notifications
- Dark/light theme

## License

MIT
