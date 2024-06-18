import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a DB Mongo...')

    } catch (error) {
        console.log("Error al contectarse a Monogo", error);
    }
}