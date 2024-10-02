import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        ;
        console.log('Connected to MongoDB Atlas Server...');


    } catch (error) {
        console.log('Error connecting to MongoDB Atlas Server:', error.message);

    }
}