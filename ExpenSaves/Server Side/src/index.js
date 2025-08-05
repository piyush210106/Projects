import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./DB/DB.js"

dotenv.config({
    path: "./.env"
});

connectDB()
            .then( () => {
                app.listen(process.env.PORT || 3000, () => {
                    console.log("App is listening on port ", process.env.PORT);
                })
                
            })
            .catch( (error) => {
                    console.error("App is not able to listen ", error);
            })

