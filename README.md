
# React Firebase Work Schedule Management App

This project is a web application built using React, Firebase, and Firestore, aimed at managing work schedules, tasks, and employee shifts. The application includes authentication, protected routes, and a robust user interface for managing employees, tasks, and shifts.

## Overview

- **Framework**: React
- **Backend**: Firebase Authentication and Firestore
- **Purpose**: To manage work schedules, tasks, and employee shifts with a focus on user authentication and data management.
- **Key Features**:
  - User authentication with Firebase Authentication
  - Work schedule management using Firestore
  - Responsive and interactive UI using React and Material-UI
  - Protected routes to ensure only authorized users can access certain features

## Project Structure

### Public and HTML

- **`client/public/index.html`**: The main HTML file that serves as the template for the React application. It includes basic meta tags and links to the manifest and favicon.

### Components

- **`client/src/components/Layout.tsx`**: Defines the layout for the application, including a sidebar for navigation and an outlet for rendering the main content.
- **`client/src/components/ProtectedRoute.tsx`**: A higher-order component that protects routes from unauthorized access, allowing only users with specific emails to view certain pages.
- **`client/src/components/Schedule.tsx`**: Manages and displays a list of schedules, allowing users to add, update, and delete schedule entries.
- **`client/src/components/Sidebar.tsx`**: A sidebar component that includes links to different sections of the application and a logout button.
  
### Pages

- **`client/src/pages/Login.tsx`**: The login page that allows users to sign in using Google authentication. It checks if the user’s email is authorized and redirects them accordingly.
- **`client/src/pages/LoginStyles.ts`**: Contains styled-components used in the Login page for a consistent and visually appealing design.
- **`client/src/pages/ScheduleManagement.tsx`**: Provides a comprehensive interface for managing employees, task types, tasks, and shifts. This page allows CRUD operations for all these entities.
- **`client/src/pages/WorkSchedule.tsx`**: Displays a calendar view of the work schedule, showing all shifts in a visual format using the `react-big-calendar` library.

### App and Configuration

- **`client/src/App.tsx`**: The main component that sets up the routing for the application, including the login page, protected routes, and layout.
- **`client/src/firebaseConfig.ts`**: Configures Firebase for the application, including authentication and Firestore database initialization.
- **`client/src/index.tsx`**: The entry point for the React application, rendering the `App` component into the root DOM node.

### Styling and Assets

- **`client/src/App.css`**: Global CSS styles applied across the application.
- **`client/package.json`**: Lists all dependencies, scripts, and configurations for the project, including both runtime and development dependencies.
- **`client/tsconfig.json`**: TypeScript configuration file, specifying compiler options and the included files for type checking.

## Setup and Execution

### Prerequisites

- **Node.js** and **npm** installed on your machine
- **Firebase** project set up with authentication and Firestore enabled
- Environment variables configured for Firebase API keys and other settings

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/work-schedule-management.git
   cd work-schedule-management/client
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `client` directory with the following contents:
     ```
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
     ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. The application will be available at `http://localhost:3000`.

### Deployment

To create a production build of the application:

```bash
npm run build
```

This will create an optimized build in the `build` directory, which can be deployed to any static hosting service.

## Dependencies

- **React**: Frontend framework for building user interfaces
- **Firebase**: Backend services for authentication and data storage
- **Material-UI**: UI component library for React
- **React Router**: For managing navigation and routing in the app
- **React Big Calendar**: For displaying schedules and shifts in a calendar format
- **Styled Components**: For styling React components with CSS-in-JS
- **TypeScript**: For type-safe JavaScript development

## License

This project is licensed under the MIT License.

---

This README provides an overview and setup instructions for the Work Schedule Management App. Feel free to modify it to better fit your project's specific details.
