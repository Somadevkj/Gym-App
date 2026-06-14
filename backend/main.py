import json
import sqlite3
import os
import sys
import webbrowser
import threading
from datetime import datetime

# FIX FOR PYINSTALLER NOCONSOLE stdout isatty ERROR
if sys.stdout is None:
    sys.stdout = open(os.devnull, "w")
if sys.stderr is None:
    sys.stderr = open(os.devnull, "w")

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Any

app = FastAPI(title="GymApp History API")

# Allow requests from Vite dev server during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Determine base path for PyInstaller or Dev mode
if getattr(sys, 'frozen', False):
    # Running as PyInstaller .exe
    BASE_DIR = sys._MEIPASS
    DB_PATH = "history.db" # Save DB in same folder where .exe is run
else:
    # Running normally as a python script
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    DB_PATH = os.path.join(BASE_DIR, "history.db")

DIST_DIR = os.path.join(BASE_DIR, "dist")



def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS workout_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at TEXT NOT NULL,
            goal TEXT NOT NULL,
            experience TEXT NOT NULL,
            days INTEGER NOT NULL,
            duration TEXT NOT NULL,
            injury TEXT NOT NULL,
            split TEXT NOT NULL,
            focus TEXT NOT NULL,
            intensity TEXT NOT NULL,
            explanation TEXT NOT NULL,
            safety_advice TEXT,
            schedule TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()


init_db()


class SaveHistoryRequest(BaseModel):
    goal: str
    experience: str
    days: int
    duration: str
    injury: str
    split: str
    focus: str
    intensity: str
    explanation: str
    safetyAdvice: str | None = None
    schedule: Any  # JSON-serializable list


@app.post("/api/history", status_code=201)
def save_history(body: SaveHistoryRequest):
    conn = get_db()
    conn.execute(
        """
        INSERT INTO workout_history
            (created_at, goal, experience, days, duration, injury,
             split, focus, intensity, explanation, safety_advice, schedule)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            datetime.utcnow().isoformat(),
            body.goal,
            body.experience,
            body.days,
            body.duration,
            body.injury,
            body.split,
            body.focus,
            body.intensity,
            body.explanation,
            body.safetyAdvice,
            json.dumps(body.schedule),
        ),
    )
    conn.commit()
    conn.close()
    return {"ok": True}


@app.get("/api/history")
def get_history():
    conn = get_db()
    rows = conn.execute(
        "SELECT * FROM workout_history ORDER BY id DESC"
    ).fetchall()
    conn.close()
    result = []
    for row in rows:
        entry = dict(row)
        entry["schedule"] = json.loads(entry["schedule"])
        result.append(entry)
    return result


@app.delete("/api/history/{entry_id}")
def delete_history(entry_id: int):
    conn = get_db()
    cursor = conn.execute(
        "DELETE FROM workout_history WHERE id = ?", (entry_id,)
    )
    conn.commit()
    conn.close()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Entry not found")
    return {"ok": True}

# --- STATIC FILE SERVING FOR REACT APP ---
# Serve static assets (JS, CSS, images) from dist/assets
if os.path.exists(os.path.join(DIST_DIR, "assets")):
    app.mount("/assets", StaticFiles(directory=os.path.join(DIST_DIR, "assets")), name="assets")

# Catch-all route to serve the SPA index.html for React Router
@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    index_file = os.path.join(DIST_DIR, "index.html")
    # If the exact file exists (like an image), serve it
    static_file = os.path.join(DIST_DIR, full_path)
    if os.path.isfile(static_file):
        return FileResponse(static_file)
    # Otherwise, fallback to index.html for client-side routing
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {"message": "API is running. To view the app, run the build script first to generate the dist/ folder."}

def open_browser():
    # Wait a tiny bit for the server to spin up, then open default browser
    import time
    time.sleep(1.5)
    webbrowser.open_new("http://127.0.0.1:8000")

def print_banner():
    banner = """
=======================================================
  GymApp API  —  http://localhost:8000
  Endpoints:
    POST   /api/history      — Save workout history
    GET    /api/history      — Get all workout history
    DELETE /api/history/{id} — Delete a history entry
    GET    /                 — Serve React SPA
=======================================================
"""
    print(banner)


if __name__ == "__main__":
    import uvicorn

    threading.Thread(target=open_browser, daemon=True).start()

    print_banner()

    if getattr(sys, 'frozen', False):
        # PyInstaller .exe — suppress console logging
        import logging
        logging.basicConfig(filename="server.log", level=logging.ERROR)

        log_config = uvicorn.config.LOGGING_CONFIG
        if "loggers" in log_config and "uvicorn" in log_config["loggers"]:
            del log_config["loggers"]["uvicorn"]["handlers"]

        uvicorn.run(app, host="127.0.0.1", port=8000, log_config=None)
    else:
        uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
