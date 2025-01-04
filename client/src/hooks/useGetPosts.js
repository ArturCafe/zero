import { useState, useEffect } from "react";
import { BACKEND_URI } from "../config/constants";
import axios from "axios";



export default function useGetPosts() {

  const [posts, setPosts] = useState([]);


  const getPosts = async () => {

    try {
      const { data } = await axios.get(
        
    
         `${BACKEND_URI}/v1/posts/get-posts`

      );
      setPosts(data?.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

 return posts;
}


