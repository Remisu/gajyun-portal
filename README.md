# Schedule Management System

This is a schedule management system developed in React and Firebase, designed to enable the creation, editing, and management of employees, checklist types, task types, tasks, and shifts.

## Features

- **Employee Management:** Add, edit, and delete employees.
- **Checklist Types:** Create, edit, and delete checklist types.
- **Task Types:** Create, edit, and delete task types.
- **Task Management:** Add, edit, and delete tasks, including selecting the days of the week the task will be performed.
- **Shift Management:** Add, edit, and delete shifts, associating employees and checklists with specific dates.
- **Authentication:** Only authorized users can access the system.

## Technologies Used

- **Frontend:**
  - React
  - TypeScript
  - Material-UI

- **Backend:**
  - Firebase Firestore for data storage
  - Firebase Authentication for user authentication

## Installation

### Prerequisites

Ensure you have Node.js and npm installed on your machine.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/username/schedule-management.git
   ```

2. Navigate to the project directory:

   ```bash
   cd schedule-management
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Configure Firebase:

   - Create a project in [Firebase](https://firebase.google.com/).
   - Add a `firebaseConfig.js` file in the `src` directory with your Firebase credentials:

     ```javascript
     import { initializeApp } from "firebase/app";
     import { getFirestore } from "firebase/firestore";
     import { getAuth } from "firebase/auth";

     const firebaseConfig = {
       apiKey: "your-api-key",
       authDomain: "your-auth-domain",
       projectId: "your-project-id",
       storageBucket: "your-storage-bucket",
       messagingSenderId: "your-messaging-sender-id",
       appId: "your-app-id"
     };

     const app = initializeApp(firebaseConfig);
     const db = getFirestore(app);
     const auth = getAuth(app);

     export { db, auth };
     ```

5. Start the project:

   ```bash
   npm start
   ```

   The project will run on `http://localhost:3000`.

## Usage

- Log in with an authorized email.
- Use the tabs to navigate and manage employees, checklist types, task types, tasks, and shifts.
- Edit and delete actions require confirmation to prevent accidental changes.

## Contributing

If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-branch`.
3. Make your changes and commit: `git commit -m 'My new feature'`.
4. Push to the main branch: `git push origin my-branch`.
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. (Not implemented)

## Author

- **Emerson Barros** - [My Github](https://github.com/Remisu)

## Contact

For any questions or suggestions, contact me at [emersongne@gmail.com](mailto:your.email@example.com).
