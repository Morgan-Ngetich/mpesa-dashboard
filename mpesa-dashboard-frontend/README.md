# M-Pesa Dashboard Frontend

## 🌍 Overview
The frontend is a **React-based dashboard** built using **Vite + TypeScript**. It provides a visual interface for monitoring and analyzing M-Pesa transactions.

## 🔧 Prerequisites
- **Node.js** (v16+)
- **npm** or **yarn**

## 📥 Installation

### 1️⃣ Install Dependencies
```sh
cd frontend
npm install
```

### 2️⃣ Start the Development Server
```sh
npm run dev
```

By default, the frontend runs at:
```sh
http://localhost:5173/
```

## 🔑 Environment Variables
Create a `.env` file in the `frontend` directory and define the backend API URL:
```
VITE_API_URL=http://localhost:8000
```

⚠️ Ensure the backend is running before accessing the dashboard.

## 🚀 Production Build
To build and serve the frontend:
```sh
npm run build
npm run preview
```

This optimizes the app for production.
