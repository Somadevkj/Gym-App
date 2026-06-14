ApexFit: Personalized Gym Workout Planner
ApexFit is an intelligent, full-stack workout planning application that engineers custom weekly gym schedules tailored to an individual's fitness goals, experience level, time availability, and physical limitations.
Built with a React (Vite) + TypeScript frontend and a FastAPI + SQLite backend, ApexFit is designed to replace generic online workout routines with structured, science-backed plans. It can be run locally or compiled into a single, standalone executable .exe file for simple desktop deployment.

What It Does
ApexFit guides users through an interactive questionnaire and immediately generates a comprehensive training framework:

Personalized Assessment Questionnaire
Primary Fitness Goals: Fat Loss, Muscle Gain, or Cardiovascular/Muscular Endurance.
Experience Levels: Beginner (< 1 year), Intermediate (1-3 years), or Advanced (3+ years).
Time Commitment: Training days per week (1–7 days) and target session duration (Short, Medium, Long).
Physical Limitations: Upper Body, Lower Body, or Back/Spinal injuries.

Rule-Based Workout Generation
Adapts workout splits (e.g., Push/Pull/Legs, Upper/Lower, Full Body, Hypertrophy splits) based on selected training days and fitness goals.
Populates a full 7-day schedule with targeted exercises, rest days, and recovery prompts.
Explains the training logic behind the recommendations so users understand the "why" of their plan.
Injury-Aware Safety Logic
Detects physical limitations and provides specific safety tips (e.g., avoiding axial loading, such as squats/deadlifts for spinal issues).
Automatically adapts exercise recommendations to protect the user's joints and muscle groups.

Persistent History Log
Saves generated plans automatically to a local database.
Allows users to review, expand, or delete past routines from a responsive dashboard.

Technology Stack
ApexFit utilizes a modern, lightweight, and high-performance stack:
Frontend
Framework: React 18 with Vite (TypeScript) for fast builds and reactive components.
Styling: Tailwind CSS v4 (via @tailwindcss/vite) for a premium, dark-mode-first aesthetic.
Animations: Framer Motion (motion/react) for smooth step-by-step form transitions and card expansions.
Icons: Lucide React for consistent vector symbols.
Routing: React Router v7 for client-side navigation.
Component Primitives: Radix UI for accessible interface structures.

Backend & Database
Framework: FastAPI (Python) for a fast, async-supported web API.
Database: SQLite (SQLAlchemy-less standard library sqlite3) to store user history locally in a lightweight history.db file.
Web Server: Uvicorn to run the ASGI application.
Packaging: PyInstaller to compile the FastAPI server and static React build into a console-free, single-executable desktop app.
Architecture & Logic Flow
ApexFit is split into two distinct layers that coordinate seamlessly:
graph TD
    User([User]) -->|Inputs Questionnaire| React[React SPA Frontend]
    React -->|Generate Recommendation| ExpertSystem[Expert Logic Engine]
    ExpertSystem -->|Computes Split & Exercises| React
    React -->|POST /api/history| FastAPI[FastAPI Backend Server]
    FastAPI -->|Write Entry| SQLite[(SQLite history.db)]
    React -->|GET /api/history| FastAPI
    FastAPI -->|Read History| SQLite

The Expert Logic Engine
Workout generation is completely computed on the client side for maximum responsiveness. expertLogic.ts operates as a rule-based expert system containing:
A structured database of exercise pools grouped by goal and experience levels.
Algorithmic distribution logic to allocate active workout sessions vs. rest days across the 7-day week based on the number of requested training days.
Rules that dynamically inject safety instructions and alter training volume.

Backend Persistence
The FastAPI backend serves two purposes:
API Endpoints
POST /api/history: Persists a new workout plan (storing inputs, computed schedule as a JSON string, explanation, and timestamp).
GET /api/history: Fetches all saved history entries, sorted by newest first.
DELETE /api/history/{id}: Deletes an entry by ID.

Static SPA Server
Serves the compiled React production bundle (dist/index.html and assets).
Automatically launches the default web browser to http://127.0.0.1:8000 on startup.

Running the Project Locally
Run the Frontend (Dev Mode)
To run the React frontend independently with hot reloading:

cd Gymapp-main
npm install
npm run dev

The React development server runs on http://localhost:5173.
Run the Backend (Dev Mode)
Create a Python virtual environment, install dependencies, and run the FastAPI server:

cd backend
python -m venv .venv

# On Windows:
.venv\Scripts\activate

# On macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
python main.py
The FastAPI server will run on http://127.0.0.1:8000 and automatically open in your web browser.
Packaging as a Standalone Desktop Executable (.exe)

You can bundle the frontend and backend into a single double-clickable executable:

Build the React Frontend
cd Gymapp-main
npm run build
This generates the static files in Gymapp-main/dist.
Copy the dist folder.
Move or copy the generated dist folder into the backend/ directory so FastAPI can read and serve the static files:
cp -r Gymapp-main/dist backend/dist

Compile with PyInstaller
cd backend
pyinstaller --noconsole --onefile --add-data "dist;dist" main.py
--onefile: Combines all assets and Python code into one executable.
--noconsole: Suppresses the command prompt window during app execution.
--add-data "dist;dist": Bundles the frontend build directory into the executable.
The final executable (main.exe) will be generated inside the backend/dist/ directory. When launched, it will silently spin up the FastAPI server in the background and create a local SQLite history.db database file in the same directory, and open the interface automatically in the user's default browser.
