import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
       required: true,
    },
    
    description: {
      type: String,
     required: true,
    },
    
    likes: {
			// array of user ids
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			default: [],
		},
    
    postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
    
     category: {
       type: mongoose.ObjectId,
        ref: "category",
        required: true,
     },

    comments: {
			// array of user ids
      type: [mongoose.Schema.Types.ObjectId],
			ref: "comment",
			default: [],
		},

    photo: 
      [{
        type: String,
        default: "undefined"
      }],
    
    video: 
      [{
        type: String,
         default: "undefined"
      }],
     
  },
  { timestamps: true },
);

export default mongoose.model("Post", postSchema);
