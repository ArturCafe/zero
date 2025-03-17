/*import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { BACKEND_URI } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

const CommentPost = ({ post, user }) => {
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (post) {
      setComments(post.comments || []);
      setPostId(post._id || "");
    }
  }, [post]);

  const handleComment = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Înregistrează-te pentru a putea comenta");
      navigate("/register");
      return;
    }

    try {
      const commentData = new FormData();
      commentData.append("text", text);
      commentData.append("userComment", user.name);
      commentData.append("commentPost", postId);

      const { data } = await axios.put(
        `${BACKEND_URI}/v1/posts/create-comment`,
        commentData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data) {
        toast.success("Comentariul a fost adăugat cu succes");
        setComments((prevComments) => [
          ...prevComments,
          { text, userComment: user.name },
        ]);
        setText("");
      } else {
        toast.error(data?.message || "A apărut o eroare");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ceva nu a mers bine");
    }
  };

  return (
    <>
      <div className="row card flex-row">
        <CommentList comments={comments} />
      </div>

      <div>
        <CommentInput text={text} setText={setText} handleComment={handleComment} />
      </div>
    </>
  );
};

export default memo(CommentPost);*/
import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { BACKEND_URI } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

const CommentPost = ({ post, user }) => {
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (post) {
      setComments(post.comments || []);
      setPostId(post._id || "");
    }
  }, [post]);

  const handleComment = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Înregistrează-te pentru a putea comenta");
      navigate("/register");
      return;
    }

    try {
      const commentData = new FormData();
      commentData.append("text", text);
      commentData.append("userComment", user.name);
      commentData.append("commentPost", postId);

      const { data } = await axios.put(
        `${BACKEND_URI}/v1/posts/create-comment`,
        commentData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data) {
        toast.success("Comentariul a fost adăugat cu succes");
        setComments((prevComments) => [
          ...prevComments,
          { text, userComment: user.name },
        ]);
        setText("");
      } else {
        toast.error(data?.message || "A apărut o eroare");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ceva nu a mers bine");
    }
  };

  return (
    <>
      <div className="row card flex-row">
        <CommentList comments={comments} />
      </div>

      <div>
        <CommentInput text={text} setText={setText} handleComment={handleComment} />
      </div>
    </>
  );
};

export default memo(CommentPost);
