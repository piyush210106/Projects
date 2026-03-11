from fastapi import FastAPI
from resume_parse_pipeline import resume_parser_pipeline
from job_resume_pipeline import job_resume_match
from pydantic import BaseModel
from dotenv import load_dotenv
load_dotenv()
app = FastAPI(title="AI Service")

class ProcessResumePayload(BaseModel):
    resume_id: str
    resume_url: str
    firebase_uid: str

@app.get("/")
def read_root():
    print("Hello, Your server is running!!")
    return {"status": "Hello, Your server is running!!"}

@app.post("/process-resume")
async def process_resume(payload: ProcessResumePayload):
    resume_parser_pipeline(
        resume_id=payload.resume_id,
        resume_url=payload.resume_url,
        firebase_uid=payload.firebase_uid
    )
    return {"status": "processing started"}

@app.post("/appication-matching")
async def analyze_application(payload: dict):
    job_resume_match(
        job_text=payload["job_text"],
        resume_vector_id=payload["resumeId"],
        application_id=payload["application_id"]
    )
    return {"status": "Analysis Started"}

