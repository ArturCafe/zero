import React from "react";
import axios from "axios";
import { BACKEND_URI } from "../../config/constants";
import { useState, useEffect, memo} from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";


const CommentPost = ({post, user }) => {

  const navigate = useNavigate();
  const [commentPost, setCommentPost] = useState(
[{
  commentPost: '',
  userComment: '',
  text: ''
}]
  );

    const [comments, setComments] = useState([{}]);

    const [postId, setPostId] = useState('');

    const [text, setText] = useState('');
    



useEffect(() => {
    
  setComments(post?.comments);
  setPostId(post?._id);

 }, [comments, post]);

 useEffect(() => {
    
  setCommentPost({
    
      commentPost: postId,
      userComment: user?.name,
      text: text
  } 
  );

}, [text]);

const handleComment = async (e) => {
  if (!user) {
   
    navigate("/register");
   alert('inregistrezate pentru a putea commenta')
     
   }
  e.preventDefault();
  try {

    const commentData = new FormData();
    commentData.append("text", text);
    commentData.append("userComment", user.name);
    commentData.append("commentPost", postId);
   

const { data } = axios.put(
  //"http://62.164.216.71/api/v1/posts/create-comment"
  `${BACKEND_URI}/v1/posts/create-comment`
  , commentData );

    if (data?.success) {
      toast.error(data?.message);

    } else {
      toast.success("comment Created Successfully");
      setComments([{...comments.push(commentPost)}]);
      setText('');
    }
  } catch (error) {
    console.log(error);
    toast.error("something went wrong");
  }
};




  return (
    <>
    {

    
    }
     <div div className="row card flex-row" >

         <CommentList comments={comments}  />
             
     </div>
                
     <div>
          <CommentInput 
          text={text}  
          setText={ setText}
           handleComment={handleComment}/>
     </div>
          
      
    </>
  );
};

export default memo(CommentPost);
