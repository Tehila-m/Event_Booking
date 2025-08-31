import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
        console.error("*****error connection to mongo DB****\n" + err)
    }
}

export default connectMongoDB;
