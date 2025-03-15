# M-Pesa Dashboard Backend

## 🌍 Overview
The backend is built using **FastAPI** and handles:
- Transaction processing
- Kafka event-driven messaging
- API communication with the frontend

## 🔧 Prerequisites
- **Python 3.9+**
- **Poetry** (for dependency management)
- **Kafka** (ensure Kafka is running)

## 📥 Installation

### 1️⃣ Install Poetry
If Poetry is not installed, install it using:
```sh
curl -sSL https://install.python-poetry.org | python3 -
```

if you like you can run the appication on the poetry shell using:
```sh
poetry shell
```

### 2️⃣ Install Dependencies
```sh
cd backend
poetry install
```

### 3️⃣ Start the Backend Server
```sh
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

By default, the backend runs at:
```sh
http://localhost:8000
```

## 🔑 Environment Variables
Create a `.env` file in the `backend` directory:
```
KAFKA_BROKER=localhost:9092
API_KEY=your-secret-key
```

⚠️ Ensure Kafka is running before starting the backend.

## 🧪 Testing the API
You can test the API using **Swagger UI** at:
```sh
http://localhost:8000/docs
```

Alternatively, use cURL:
```sh
curl -X GET "http://localhost:8000/health" -H "accept: application/json"
```

## 🚀 Production Deployment
To run the backend in production:
```sh
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000
```
