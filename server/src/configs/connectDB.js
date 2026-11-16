import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error(
        "MONGO_URI (or MONGODB_URI) environment variable is not defined!",
      );
      return;
    }

    // Sanitize accidental leading/trailing quotes and whitespace from dashboard input
    mongoUri = mongoUri.trim().replace(/^["']|["']$/g, "");

    const maskedUri = mongoUri.replace(/:([^@]+)@/, ":****@");
    console.log("Connecting to MongoDB Atlas:", maskedUri);

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 20000,
    });
    console.log("Database connected successfully:", conn.connection.name);
    console.log(`Database host: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message || error);
  }
};

export default connectDB;
