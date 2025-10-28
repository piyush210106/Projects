import connectDB from "./db/DB.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});

connectDB()
          .then(() => {
                app.listen(process.env.PORT || 3000, () => {
                    console.log("App is listening on port ",process.env.PORT);
                })
          })
          .catch((error) => {
                console.log("Error in initializing app!! ", error);
          })
