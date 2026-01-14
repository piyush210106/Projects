from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
import json

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0.3
)

analysis_prompt = PromptTemplate(
    input_variables=["resume", "jobtext"],
    template="""
        You are an ATS resume evaluator.

        Job Description:
        {job}

        Resume:
        {resume}

        Return STRICT JSON:
        {
        "matchedSkills": [],
        "missingSkills": [],
        "analysis": "",
        "recommendations": ""
        }
    """
)

def _content_to_string(content) -> str:
    if isinstance(content, str):
        return content

    if isinstance(content, list):
        return "\n".join(
            item if isinstance(item, str) else json.dumps(item)
            for item in content
        )

    return str(content)


def analyze_resume_with_gemini(resume_text: str, job_description: str) -> dict:
    chain = analysis_prompt | llm
    response = chain.invoke({
        "resume": resume_text,
        "job": job_description
    })

    raw_text = _content_to_string(response.content)

    try:
        return json.loads(raw_text)
    except json.JSONDecodeError:
        return {
            "matchedSkills": [],
            "missingSkills": [],
            "analysis": raw_text,
            "recommendations": ""
        }