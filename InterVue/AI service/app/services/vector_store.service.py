from langchain_google_genai import GoogleGenerativeAIEmbeddings
import os
from app.db.pinecone import index

def get_embedding_model():
    return GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
    )

def store_resume_vectors(resume_id: str, chunks: list, firebase_uid: str):
    embeddings = get_embedding_model()
    vectors = []

    for i, doc in enumerate(chunks):
        vector = embeddings.embed_query(doc.page_content)

        vectors.append({
            "id": f"{resume_id}_chunk_{i}",
            "values": vector,
            "metadata": {
                "resumeId": resume_id,
                "firebaseUid": firebase_uid,
                "chunkIndex": i
            }
        })

    index.upsert(vectors=vectors)