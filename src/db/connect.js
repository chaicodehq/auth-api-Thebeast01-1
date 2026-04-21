import mongoose from "mongoose";

let isConnected = false;

export async function connectDB(uri) {
    if (!uri) {
        throw new Error("MongoDB URI is required");
    }

    if (isConnected) {
        return mongoose.connection;
    }

    try {
        const conn = await mongoose.connect(uri);

        isConnected = conn.connections[0].readyState === 1;

        return mongoose.connection;

    } catch (error) {
        console.error("DB connection failed:", error);
        throw error;
    }
}
