import mongoose from "mongoose"
const connectDB = async () => {
    try {
        console.log([...process.env.MONGO_DB_URI]);

        console.log(JSON.stringify(process.env.MONGO_DB_URI));

        await mongoose.connect(`${process.env.MONGO_BD_URI}/${process.env.MONGO_DB_NAME}`);
        console.log("MongoDB connected!!!");
    } catch (error) {
        console.error("Error in connecting DB ", error);
    }
}

export default connectDB