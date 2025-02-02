# Task Management Tool

A modern and responsive Task Management Tool built with React and TypeScript. This application helps users effectively manage tasks, track task history, and customize views to enhance productivity. The tool allows seamless task management, from creation to completion, with a fully customizable and responsive interface.

## Features

- **Responsive Design**: Fully responsive UI for desktop, tablet, and mobile devices.
- **Task History**: Track the history of tasks, including their status changes.
- **Customizable Views**: Apply filters based on category, due date, status, and search terms.
- **Task Management**: Create, update, delete, and categorize tasks. Toggle between task statuses: To-Do, In Progress, and Completed.
- **User Authentication**: Secure login using Firebase Authentication.
- **Notifications**: Get notifications when tasks are updated or nearing their due dates.

## Tech Stack

- **Frontend**:
  - React
  - TypeScript
  - Tailwind CSS
  - React Router (for navigation)
  - React Hot Toast (for notifications)
- **Backend**:
  - Firebase Firestore (real-time database for storing and managing tasks)
  - Firebase Authentication (for user authentication)
- **State Management**:
  - React useState and useEffect hooks

## Installation

To run this project locally, follow the steps below:

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps

1. Clone this repository:

   ```bash
   git clone https://github.com/Abhishekkvpnld/Task_Management.git
   ```

2. Navigate into the project directory:

   ```bash
   cd task-management-tool
   ```

3. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Create a `.env` file at the root of the project and add your Firebase configuration variables:

   ```bash
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

5. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be running on `http://localhost:5173`.



