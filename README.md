ApexFit: Personalized Gym Workout Planner
ApexFit is a full-stack application that generates personalized weekly gym plans based on user goals, experience level, available training days, session length, and injury constraints. It replaces generic workout routines with structured, rule-based programs.
It uses a React (Vite + TypeScript) frontend and a FastAPI + SQLite backend, and can also be packaged into a standalone .exe using PyInstaller.

What it does
1.User assessment

2.Collects fitness goals (fat loss, muscle gain, endurance), experience level, weekly training days, session duration, and physical limitations.
3.Workout generation
4.Uses a rule-based system to generate a 7-day training plan with appropriate splits (Push/Pull/Legs, Upper/Lower, Full Body), rest days, and exercise selection based on user input.
5.Injury-aware logic
6.Adjusts exercises and adds safety modifications depending on injuries or limitations.
7.History tracking
8.Stores generated plans locally in a SQLite database for later review or deletion.

Tech stack
Frontend: React (Vite), TypeScript, Tailwind CSS, Framer Motion, React Router, Radix UI
Backend: FastAPI, Uvicorn
Database: SQLite
Packaging: PyInstaller

Architecture
User → React UI → Rule-based logic engine → Plan generated
React ↔ FastAPI ↔ SQLite (history storage)

Running locally

Frontend:
npm install
npm run dev

Backend:
python -m venv .venv
activate environment
pip install -r requirements.txt
python main.py

Build executable
npm run build (frontend)
Copy dist to backend
pyinstaller --onefile --noconsole --add-data "dist;dist" main.py

Output is a single .exe that runs the backend and opens the app automatically.
