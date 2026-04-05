import mongoose from "mongoose"
const connectDB =async () =>{
    try
{
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("database connected successfully")
}catch(error){
    console.log("MongoDB connection failed", error);
}}

export default connectDB