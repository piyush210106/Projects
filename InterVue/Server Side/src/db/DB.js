import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_DB_URI}/${process.env.MONGO_DB_NAME}`);
        console.log("MongoDb connected!!");
    } catch (error) {
        console.log("Error in connecting db ", error);
    }

}

export default connectDB;