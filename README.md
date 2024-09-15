# Virtual Agenda

Virtual Agenda is a React-based task management application built with TypeScript and Vite. It provides a user-friendly interface for creating, organizing, and tracking tasks.  
https://virtual-agenda.netlify.app/

## Features

- Create, edit, and delete tasks
- Drag-and-drop functionality for task status updates
- Basic and advanced filtering options
- Visual representations of task data using charts
- Responsive design for various screen sizes

## Key Components

1. **Task Management**

   - Create tasks with title, description, priority, and start date
   - Edit existing tasks
   - Delete tasks
   - Mark tasks as related to other tasks

2. **Task Organization**

   - Tasks are organized into three categories: Created, In Progress, and Completed
   - Drag-and-drop interface for moving tasks between categories

3. **Filtering**

   - Basic filtering by date
   - Advanced filtering by date range, title, and status

4. **Data Visualization**

   - Bar chart showing task distribution by status
   - Pie chart displaying task distribution by priority

5. **Responsive Layout**
   - Adapts to different screen sizes (desktop, tablet, mobile)

## Technology Stack

- React
- TypeScript
- Vite
- Material-UI (MUI)
- Victory (for charts)
- dnd kit (for drag-and-drop functionality)
- Day.js (for date handling)
- React Router (for routing)

## Project Structure

The project follows a component-based architecture with context for state management. Key directories include:

- `src/components`: React components
- `src/contexts`: Context providers for global state
- `src/hooks`: Custom React hooks
- `src/models`: TypeScript interfaces and enums
