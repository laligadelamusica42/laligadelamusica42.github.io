import mongoose from 'mongoose';

const { MONGODB_URI } = process.env || null;

const connectDB = () => {
    mongoose.connect(MONGODB_URI);

    // Managing Connections
    if (mongoose.connection) {
    mongoose.connection.on("error", () => {
        console.log(
        "MongoDB connection error. Please make sure MongoDB is running."
        );
        process.exit();
    });
    mongoose.connection.on("connected", () => {
        console.log("MongoDB connected.");
    });
    mongoose.connection.on("disconnected", () => {
        console.log("MongoDB disconnected.");
    });
    }
}

// Exporting connection for external usage
export default connectDB;