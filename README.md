
# Task Management Application

A full-stack task management application built with React, allowing users to manage their daily tasks efficiently.

## Features

- **User Authentication**: Register and log in with email/password
- **Task Management**: 
  - Create, view, update, and delete tasks
  - Mark tasks as complete/incomplete
  - Set priority levels (Low, Medium, High)
- **Task Organization**:
  - Filter tasks by status (All, Active, Completed)
  - Sort tasks by creation date
  - Categorize tasks by priority

## Tech Stack

- **Frontend**:
  - React with TypeScript
  - Tailwind CSS for styling
  - Shadcn UI components
  - React Query for data fetching
  - React Router for navigation

- **State Management**:
  - React Context API
  - Custom hooks for reusable logic

## Project Structure

The application follows a component-based architecture:

- `/components`: Reusable UI components
- `/contexts`: React contexts for state management
- `/hooks`: Custom React hooks
- `/pages`: Main application pages
- `/lib`: Utility functions and helpers

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

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

## Usage

1. Register a new account or log in with existing credentials
2. Add new tasks using the task form
3. Update task status by clicking on the checkbox
4. Edit or delete tasks using the provided controls
5. Filter tasks by status using the filter options

## Database Schema

### User
- id: UUID (primary key)
- name: String
- email: String (unique)
- password: String (hashed)
- created_at: Timestamp

### Task
- id: UUID (primary key)
- user_id: UUID (foreign key -> User.id)
- title: String
- description: String
- status: Boolean
- priority: Enum ('low', 'medium', 'high')
- created_at: Timestamp

## Test Users

For testing purposes, you can use these accounts:

1. **Regular User**
   - Email: admin@example.com
   - Password: password

2. **Demo User**
   - Email: demo@example.com
   - Password: password

Each test user has sample tasks pre-populated in their account.

## License

[MIT](LICENSE)
