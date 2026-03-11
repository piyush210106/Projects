from db.mongo import resume_collection
from datetime import datetime

def update_resume_success(
    resume_id: str,
    extracted_text: str,
    features: dict,
    vector_id: str
):
    resume_collection.update_one(
        {"_id": resume_id},
        {
           "$set": {
                "processing_status": "completed",
                "extractedText": extracted_text,
                "features": features,
                "embedding_vectorId": vector_id
            }
        }
    )
    print("Database Updated")

def update_resume_failed(resume_id: str):
    resume_collection.update_one(
        {"_id": resume_id},
        {
            "$set": {
                "processing_status": "failed"
            }
        }
    )
    print("Database Resume failed")
    