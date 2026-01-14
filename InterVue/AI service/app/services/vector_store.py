from langchain_google_genai import GoogleGenerativeAIEmbeddings
import os
from app.db.pinecone import index

def get_embedding_model():
    return GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
    )

def store_resume_vector(
    text: str,
    resume_id: str,
    firebase_uid: str
) -> str:
    embeddings = get_embedding_model()

    vector = embeddings.embed_query(text)

    index.upsert([
        {
            "id": resume_id,
            "values": vector,
            "metadata": {
                "resumeId": resume_id,
                "firebaseUid": firebase_uid
            }
        }
    ])

    return resume_id
