import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const parseResume = async(fileURL) => {
  try {
    const res = await axios.get(fileURL, {responseType: "arraybuffer"});
    const pdfBytes = Buffer.from(res.data).toString('base64');

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({model: "gemini-2.5-flash-lite"});

    const prompt = `
      You are a resume parsing assistant.

      Step 1: Extract all readable text from this resume PDF.
      Step 2: From that text, create a structured JSON object in the following format.

      {
        "name": "string",
        "email": "string",
        "phone": "string",
        "skills": ["skill1", "skill2"],
        "experience": [
          {"company": "string", "role": "string", "duration": "string", "description": "string"}
        ],
        "education": [
          {"institution": "string", "degree": "string", "year": "string"}
        ],
        "projects": [
          {"title": "string", "description": "string", "technologies": ["tech1", "tech2"], "link": "string", "duration": "string"}
        ]
      }

      ⚠️ Output format (strictly follow this structure):
      {
        "text": "raw extracted text from resume",
        "structured": { <structured JSON as above> }
      }

      Return ONLY this JSON object — no markdown, no code fences, no comments.
    `;

    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          mimeType: "application/pdf",
          data: pdfBytes,
        },
      },
    ]);

    const response = result.response.text().trim();
    const cleaned = response
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Gemini did not return valid JSON");

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      text: parsed.text || "",
      structured: parsed.structured || {},
    };

  } catch (error) {
    console.log("Error in parsing resume!! ", error);
  }
}

export {parseResume};