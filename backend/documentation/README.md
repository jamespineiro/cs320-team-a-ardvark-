# Backend – Synchro
This is the backend of the Synchro web application. The system aggregates assignment deadlines from multiple academic platforms (Canvas, Gradescope, etc.) and supports secure user authentication and optional calendar export.

The backend includes:
* A Node.js + Express server
* MongoDB user authentication (AES-256 encryption)
* A Python script for generating .ics calendar files
* Secure environment variable configuration

## Project Structure
backend/ <br />
│── index.js                # Main Express server <br />
│── model/ <br />
│     └── User.js           # Mongoose User schema <br />
│── calendar_export.py      # Python ICS export script <br />
│── .env                    # Environment variables (not committed) <br />
│── package.json <br />

## Features
- Secure User Authentication
    * AES-256-CBC encryption for passwords
    * A unique IV stored per user to ensure proper decryption
    * Login route decrypts stored passwords and validates credentials
- MongoDB Integration
    * Mongoose schema + model for user management
    * Password + IV both stored securely for reversible encryption
- ICS Calendar Export
    * Python script using the ics library
    * Converts deadlines into a .ics file for external calendars
    * Compatible with Google Calendar, Apple Calendar, Outlook, etc.

## Tech Stack
* Node.js / Express
* MongoDB / Mongoose
* Crypto (AES-256-CBC)
* Python 3
* ICS Calendar Library

## Environment Variables
- Create a .env file inside the backend directory with: 
- MONGODB_CONNECTION=<your_mongodb_uri> 
- ENCRYPTION_KEY=<32_char_secret_key_or_phrase> 
- ENCRYPTION_KEY is hashed automatically into a valid AES-256 key.
- This file is intentionally not committed to the repository for security reasons.

## Setup & Installation
1. Navigate to the backend folder 
   - cd backend   
2. Install Dependencies
   - npm install
3. Configure Environment Variables 
   Create the .env file as described above. 
4. Start the Backend Server 
   - npm run start 
   - Your backend will run at: http://localhost:4000 

## API Endpoints 
1. POST /signup 
- Create a new user. 
- Request Body: 
- { <br />
    "email": "student@example.com", <br />
    "password": "mypassword" <br />
  } 

2. POST /login 
- Validate user credentials. <br />
- Request Body: <br />
- { <br />
    "email": "student@example.com", <br />
    "password": "mypassword" <br />
  } 
- Possible Responses: 
  - "Success"  
  - "The password is incorrect" 
  - "No record existed"

## Calendar Export Script (Python)
- Run Script 
- python3 calendar_export.py 
- This will produce a deadlines.ics file. 

## Sample Deadlines
- deadlines = [ <br />
    { "course": "CS 320", "assignment": "Lab 5", "due_date": "2025-11-15T23:59:00" }, <br />
    { "course": "CS 320", "assignment": "Project Report", "due_date": "2025-11-20T23:59:00" } <br />
] <br />
You can import the generated deadlines.ics file into any standard calendar application. 

## Contributors

Team Aardvark 

(James Pineiro, Nicholas Carlone, Keerthi Chebrolu, Arnav Gupta, Johan Lakshmanan, Tory Leone, Vidhita Mittal)


## License

This project is licensed under the [MIT License](./LICENSE).
