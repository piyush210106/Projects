from fastapi import FastAPI

app = FastAPI(title="AI Service")

@app.get("/")
def health_check():
    return {"status": "running"}
