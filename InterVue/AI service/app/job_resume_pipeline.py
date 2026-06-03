from db.pinecone import index
from db.mongo import applications
from utils.cosine import cosine_similarity
from utils.analyze_resume import analyze_resume_with_gemini
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import os
from dotenv import load_dotenv
from bson.objectid import ObjectId

load_dotenv()

def get_embedding_model():
    return GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=os.environ.get("GOOGLE_API_KEY")
    )

def job_resume_match(job_text: str, resume_vector_id: str, application_id: str):
    try:
        print(f"--- Starting Job-Resume Matching ---")
        print(f"Application ID: {application_id} | Resume Vector ID: {resume_vector_id}")
        
        embbeding_model = get_embedding_model()
        print("Generating job description embeddings...")
        job_vector = embbeding_model.embed_query(job_text)

        print("Fetching resume vector from Pinecone...")
        result = index.fetch(ids=[resume_vector_id])
        resume_data = result["vectors"][resume_vector_id]

        resume_text = resume_data["metadata"]["text"]
        resume_vector = resume_data["values"]

        print("Calculating Cosine Similarity...")
        similarity = cosine_similarity(resume_vector, job_vector)
        score = round(similarity * 100, 2)
        print(f"Calculated base Neural Score: {score}%")

        print("Triggering Gemini LLM for deep analysis...")
        analyzed = analyze_resume_with_gemini(
                        resume_text=resume_text,
                        job_description=job_text)
        print("Received analysis from Gemini:", analyzed)
        
        overall_fit =  (
            "Excellent" if score >= 85 else
            "Good" if score >= 70 else
            "Fair" if score >= 50 else
            "Poor"
        )

        ai_score = {
            "score": score,
            "analysis": analyzed.get("analysis", str(analyzed)),
            "matchedSkills": analyzed.get("matchedSkills", []),
            "missingSkills": analyzed.get("missingSkills", []),
            "recommendations": analyzed.get("recommendations", ""),
            "overallFit": overall_fit
        }
        
        print("Formatting and writing AI Score to MongoDB...")

        applications.update_one(
            {"_id": ObjectId(application_id)},
            {
                "$set": {
                    "aiScore": ai_score
                }
            })
        print("✓ Job Match Pipeline completed successfully!")

    except Exception as e:
        print(f"❌ Error in job_resume_match pipeline: {e}")
        raise(e)


