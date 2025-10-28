import axios from "axios";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { InferenceClient } from "@huggingface/inference";
const resumeSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    skills: z.array(z.string()).optional(),
    experience: z
    .array(
      z.object({
        company: z.string().optional(),
        role: z.string().optional(),
        duration: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
    education: z
    .array(
      z.object({
        institution: z.string().optional(),
        degree: z.string().optional(),
        year: z.string().optional(),
      })
    )
    .optional(),
    projects: z
    .array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        technologies: z.array(z.string()).optional(),
        link: z.string().optional(),
        duration: z.string().optional(),
      })
    )
    .optional()
});

const parser = StructuredOutputParser.fromZodSchema(resumeSchema);
const model = new InferenceClient({
  model: "mistralai/Mixtral-8x7B-Instruct-v0.1", 
  apiKey: process.env.HUGGINGFACE_API_KEY,
  temperature: 0.2,
});

const parseResume = async(fileURL) => {
    try {
        const res = await axios.get(fileURL, {responseType: "arraybuffer"});
        const buffer = res.data;

        let text = "";
        const pdfData = await pdf(buffer);
        text = pdfData.text;

        const prompt = `
            Extract the following details from this resume and return them as JSON:
            - name, email, phone
            - skills (list)
            - education (institution, degree, year)
            - experience (company, role, duration, description)
            - projects (title, description, technologies, link, duration)
            
            Resume text:
            """${text}"""
            `;

        const rawResponse = await model.invoke(prompt);
        try {
                const parsed = await parser.parse(rawResponse);
                return {parsed, text};
        } catch {
                const jsonStr = rawResponse.match(/\{[\s\S]*\}/)?.[0];
                return JSON.parse(jsonStr || "{}");
        }
    } catch (error) {
        console.log("Error in parsing resume!!", error);
    }

}

export {parseResume};