import mongoose/*, { connections } */from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    commentPost: {
      type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
     // type: String,
     // default: 'comment'
    },
     
    userComment: {
      type: String,
     // required: true,
     
      default: 'user comment'
    },

    text: {
      type: String,
      required: true,
      default: 'nus comment'
    },
  
   
  },
  { timestamps: true }
);

export default mongoose.model("comment", commentSchema);
