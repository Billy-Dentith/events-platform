# Event Nest

Visit the hosted site at: https://event-nest-bd.netlify.app/

Please note: The backend is currently hosted on a free tier, so it may take a little time for the events to render upon the first load of the application. This is because the service spins down when idle and spins back up upon receiving a request. 

## Summary 

Event Nest is a full-stack event management platform designed to connect users with events in their area. The platform allows users to discover, sign up for, and manage events easily. Users can also add their events to their Google calendar seamlessly. 

Staff accounts also have the ability to create and edit events on the platform. 

## Key Features

- **User Registration:** Easily sign-up and log-in to the platform to manage your events.
- **Event Discovery:** Browse the featured events in the "Home" page and all of the events in the "Find Events" page.
- **Event Registration:** Register for events by clicking on the "Join Event" button. 
- **Event Management:** If you are using a staff account, you can create events through a protected "Staff Dashboard" and edit events from within the "Find Events" page. 
- **Google Calendar Integration:** Easily add your joined events to your Google calendar. 


## Test Accounts 

#### User Test Account 

- **Email:** user@test.com
- **Password:** Test123!

This will allow you to view and join events on the platform. 

#### Staff Test Account

- **Email:** staff@test.com
- **Password:** Test123!

This will allow you to create and edit events on the platform.

Please note: You are also able to register and set-up your own account, but this will only be granted user privileges, and therefore you will only be able to join events and add them to your Google calendar. 

## Running the Project Locally

Follow these instructions to run the project on your local machine: 

### Prerequisites
- Ensure you have node.js and npm installed. You can download them from nodejs.org.
- Set up a MongoDB database with some test data, following the schemas laid out in Backend/models/....
- Set up a firebase project. 

### Clone the Repo
- Clone the repository to your local device:
```
git clone https://github.com/Billy-Dentith/events-platform.git
```
### Set-up the Backend
- Navigate to the backend directory:
```
cd events-platform
cd backend
```

- Install dependencies:
```
npm install
```

- Create a .env file in the root of the directory and add the following:
```
PORT=5000                 
MONGODB_URI=your_mongo_uri 
```

- Start the backend server
```
npm run start
```

- The server should now be accessible on http://localhost:5000. 

### Set-up the Frontend
- Navigate to the frontend directory:
```
cd events-platform
cd frontend
```

- Install dependencies:
```
npm install
```

- Create a .env file in the root of the directory and add the following, filling it out with your firebase project config information:
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_GOOGLE_CLIENT_ID=

VITE_API_BASE_URL=http://localhost:5000/api
```

- Start the application:
```
npm run dev
```

- The web application should now be running and can be opened by clicking the link within the terminal. 
