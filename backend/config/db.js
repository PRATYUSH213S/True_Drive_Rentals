import mongoose from "mongoose";

export const connectDB = async ()=> {
  await mongoose.connect("mongodb+srv://prat27703_db_user:CCkgKJU3dSg5XE0u@cluster0.ffetuhb.mongodb.net/carproject")
  .then(() => {console.log("DB connected")})
}

