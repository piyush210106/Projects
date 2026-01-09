import axios from "axios";

const triggerAIprocessing = ({resume_id, resumeUrl, firebaseUid}) => {
    axios.post("http://ai-service:8000/process-resume",
                {
                    resume_id, resumeUrl, firebaseUid,
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
        console.log("AI processing triggered");
    })
    .catch((error) => {
        console.log("Error in AI processing ", error);
    });

}

export default triggerAIprocessing;