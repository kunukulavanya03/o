from fastapi import FastAPI
from app.routes import router
from app.database import engine
from app.settings import settings

app = FastAPI()
app.include_router(router)

@app.on_event("shutdown")
def shutdown_event():
    engine.dispose()
