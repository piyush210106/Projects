from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
import json
import re

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    temperature=0
)

PROMPT = PromptTemplate(
    input_variables=["resume_text"],
    template="""
You are an AI resume parser.

Return STRICT JSON only.

{
  "skills": [string],
  "experienceYears": number,
  "education": [
    {
      "degree": string,
      "field": string,
      "institution": string,
      "graduationYear": number
    }
  ],
  "jobTitles": [string],
  "summary": string
}

Resume:
{resume_text}
"""
)

def normalize_llm_content(content) -> str:
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        return "".join(
            item if isinstance(item, str)
            else item.get("text", "")
            for item in content
            if isinstance(item, (str, dict))
        )
    raise ValueError("Unsupported LLM output format")

def safe_json_parse(text: str) -> dict:
    match = re.search(r"\{.*\}", text, re.S)
    if not match:
        raise ValueError("No JSON found in output")
    return json.loads(match.group())

def parse_resume(resume_text: str) -> dict:
    response = llm.invoke(
        PROMPT.format(resume_text=resume_text)
    )

    raw_text = normalize_llm_content(response.content)
    return safe_json_parse(raw_text)
