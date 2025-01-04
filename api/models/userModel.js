import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default:"00000000"
     // required: true,
    },
    posts: {
      type: mongoose.ObjectId,
      ref: "Post",
     // required: true,
    },
    address: {
      type: String,
      default:"00000000"
    },
  
   
    avatar: [
    {
      type: String,
      default: "undefined"
    }],
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
