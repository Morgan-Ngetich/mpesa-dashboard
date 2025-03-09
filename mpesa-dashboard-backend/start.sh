#!/bin/sh
set -e

echo "🚀 Starting FastAPI Backend..."
exec poetry run uvicorn main:app --host 0.0.0.0 --port 8000 --reload --workers 4
