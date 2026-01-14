from db.pinecone import index
from db.mongo import applications
from utils.cosine import cosine_similarity
from app.utils.analyze_resume import analyze_resume_with_gemini
from langchain_google_genai import GoogleGenerativeAIEmbeddings

def get_embedding_model():
    return GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
    )

def job_resume_match(job_text: str, resume_vector_id: str, application_id: str):
    try:
        embbeding_model = get_embedding_model()
        job_vector = embbeding_model.embed_query(job_text)

        result = index.fetch(ids=[resume_vector_id])
        resume_data = result["vectors"][resume_vector_id]

        resume_text = resume_data["metadata"]["text"]
        resume_vector = resume_data["values"]

        similarity = cosine_similarity(resume_vector, job_vector)
        score = round(similarity * 100, 2)

        analyzed = analyze_resume_with_gemini(
                        resume_text=resume_text,
                        job_description=job_text)
        overall_fit =  (
            "Excellent" if score >= 85 else
            "Good" if score >= 70 else
            "Fair" if score >= 50 else
            "Poor"
        )

        ai_score = {
            "score": score,
            "analysis": analyzed["analysis"],
            "matchedSkills": analyzed["matchedSkills"],
            "missingSkills": analyzed["missingSkills"],
            "recommendations": analyzed["recommendations"],
            "overallFit": analyzed["overallFit"]
        }

        applications.update_one(
            {"_id": application_id},
            {
                "$set": {
                    "aiScore": ai_score
                }
            })

    except Exception as e:
        raise(e)


