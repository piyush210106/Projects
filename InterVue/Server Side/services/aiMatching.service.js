import axios from "axios";

const triggerAIMatching = ({applicationId, job_text, resumeId}) => {
    axios.post("http://ai-service:8000/aiMatching",
                {
                    applicationId, job_text, resumeId,
                },
                {
                    timeout: 3000, 
                    headers: {
                        "Content-Type": "application/json",
                        "X-Internal-Secret": process.env.AI_INTERNAL_SECRET, 
                    }
                }
    )
    .then(() => {
        console.log("AI Job Matching triggered");
    })
    .catch((error) => {
        console.log("Error in AI Job Matching ", error);
    });
    
}

export default triggerAIMatching;