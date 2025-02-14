#!/bin/sh
echo "🚀 Starting FastAPI Backend..."
exec poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
