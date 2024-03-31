import mongoose from "mongoose"

async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to ${db.connection.host}`)
  } catch (error) {
    console.error(`Error connecting to MongoDB`);
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;
