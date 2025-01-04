import { useState, useEffect } from "react";
import { BACKEND_URI } from "../config/constants";

import axios from "axios";

const useHomePosts = (currentPage, limit) => {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get( `${BACKEND_URI}/v1/posts/get-posts?${currentPage}`, {
          params: {currentPage , limit },
        });
      //  setPosts((prevPosts) => [...prevPosts, ...data.posts]); // Adaugă posturile la lista curentă
      setPosts(data.posts); 
  
      setTotal(data.total); 
      
        // Totalul de posturi din baza de date
      } catch (error) {
        console.error("Eroare la încărcarea posturilor:", error);
      }
    };

    fetchPosts();
  }, [currentPage, limit]);

console.log(total);

  return { posts, total };
};

export default useHomePosts;
