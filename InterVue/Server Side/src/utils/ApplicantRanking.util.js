import Job from "../models/job.model.js";
import Resume from "../models/resume.model.js";;
import Application from "../models/application.model.js";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { InferenceClient } from "@huggingface/inference";


const schema = z.object({
    score: z.number().min(0).max(100),
    reasoning: z.string()
});

const parser = StructuredOutputParser.fromZodSchema(schema);

const model = new InferenceClient({
    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    apiKey: process.env.HUGGINGFACE_API_KEY,
    temprature: 0.2
});

const rankApplicants = async(jobId) => {
    try {
        const job = await Job.findById(jobId);
        if(!job) console.error("Error in finding job for resume ranking!!");

        const applicants = await Application.find({job: job}).populate("user");
        if(applicants.length < 10) throw new Error("Applicants less than 10 — skipping ranking.");

        let results = [];
        for(const app of applicants){
            const userId = app.user._id;
            const resume = await Resume.find({candidate: userId});
            const rawData = JSON.stringify(resume.rawData);
            if (!parsedResume) continue;
            console.log("Raw data for ",app.user.name," Data: ",rawData);

            const prompt = `
                You are an HR assistant evaluating candidates.
                Rate how well this resume matches the given job description (0–100).
                Return JSON: { "score": number, "reasoning": string } only.

                Job Description:
                """${job.description}"""

                Candidate Resume:
                """${resumeText}"""
        `;
            const raw = await model.invoke(prompt);
            let score = 0, reasoning = "Parsing error";

            try {
                const parsed = await parser.parse(raw);
                score = parsed.score;
                reasoning = parsed.reasoning;
            } catch (error) {
                const json = raw.match(/\{[\s\S]*\}/)?.[0];
                if (json) {
                    const parsed = JSON.parse(json);
                    score = parsed.score || 0;
                    reasoning = parsed.reasoning || "No reasoning provided";
                }
            }

            app.rating = score;
            app.feedback = reasoning;
            await app.save();
            results.push({
                candidate: app.user.name,
                score,
                reasoning,
        });
        }
        const top5 = results.sort((a, b) => b.score - a.score).slice(0, 5);
        console.log("Top 5 ranked candidates:", top5);
        return top5;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export {rankApplicants};