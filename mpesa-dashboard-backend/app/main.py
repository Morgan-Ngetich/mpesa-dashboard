from fastapi import FastAPI
from app.api import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="M-Pesa Dashboard")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the CSV upload route
app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Welcome to the M-Pesa Dashboard API"}