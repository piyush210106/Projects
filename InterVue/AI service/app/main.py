from fastapi import FastAPI
from resume_parse_pipeline import resume_parser_pipeline

app = FastAPI(title="AI Service")

@app.post("/process-resume")
async def process_resume(payload: dict):
    resume_parser_pipeline(
        resume_id=payload["resume_id"],
        resume_url=payload["resume_url"],
        firebase_uid=payload["firebase_uid"]
    )
    return {"status": "processing started"}
