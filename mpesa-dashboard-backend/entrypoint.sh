#!/bin/bash
# Ensure Poetry is available in PATH
export PATH="/usr/local/bin:$PATH"

# Debugging: Check if Poetry is accessible
echo "Poetry path: $(which poetry)"
poetry --version

# Run the application
exec poetry run uvicorn main:app --host 0.0.0.0 --port 8000
