# M-Pesa Dashboard

## 🚨 Confidentiality Notice
This project **does not use a database** to ensure the confidentiality of M-Pesa transaction data.

## 🏗️ Project Overview
M-Pesa Dashboard is a **financial analytics and reporting system** designed to process, visualize, and analyze M-Pesa transactions in real-time. It is built using **FastAPI, Kafka, React, and Kubernetes**, with **OpenShift** handling container orchestration.

## 🛠️ Technology Stack
- **Frontend:** Vite + React + TypeScript
- **Backend:** FastAPI + Python
- **Message Queue:** Kafka (for event-driven processing)
- **Containerization & Orchestration:** Docker, Kubernetes, OpenShift
- **Storage:** Persistent Volume Claims (PVC) for file storage
- **Reverse Proxy & Caching:** Nginx

## ⚙️ System Architecture
1. **Frontend (React)**
   - Provides a dashboard for users to view transaction analytics.
   - Communicates with the backend via REST API.

2. **Backend (FastAPI)**
   - Handles transaction processing and analytics.
   - Uses **Kafka** for event-driven messaging.
   - Exposes APIs for the frontend.

3. **Kafka**
   - Enables high-performance, event-driven transaction processing.
   - Ensures scalability for large volumes of transaction data.

4. **Nginx**
   - Serves the frontend application.
   - Acts as a reverse proxy for backend APIs.

5. **Kubernetes & OpenShift**
   - The system is deployed using OpenShift.
   - Uses **Pods, Deployments, Services, and Persistent Volumes** for efficient resource management.

---

## 🚀 Deployment Instructions

### 🛠️ Clone the Repository
```sh
git clone https://github.com/morganngetich/mpesa-dashboard.git
cd mpesa-dashboard
```

### 🐳 Run the Project Using Docker Compose
```sh
docker compose up -d
```

Once the containers are running, access the dashboard at:

```sh
http://localhost
```

### 🔗 Additional Setup Guides
- [Frontend Setup Guide](mpesa-dashboard-frontend/README.md)
- [Backend Setup Guide](mpesa-dashboard-backend/README.md)
