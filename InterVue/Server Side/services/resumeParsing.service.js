import axios from "axios";

const triggerAIprocessing = ({resume_id, resume_url, firebase_uid}) => {
    axios.post(`${process.env.AI_SERVICE_URL}/process-resume`,
                {
                    resume_id, resume_url, firebase_uid,
                },
                {
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