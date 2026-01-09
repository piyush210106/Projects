import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_DB_URL}/${process.env.MONGO_DB_NAME}`);
        console.log("Database Connected!!");
    } catch (error) {
        console.log("Error in connecting Database ", error);
    }
}

export default connectDB;