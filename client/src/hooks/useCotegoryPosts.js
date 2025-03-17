import { useState, useEffect  } from "react";
import { BACKEND_URI } from "../config/constants";

import axios from "axios";

const useCategoryPosts = ({currentPage, limit, category}) => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get( `${BACKEND_URI}/v1/posts/getcategory-posts`, {
          params: {currentPage , limit , category},
        });
      //  setPosts((prevPosts) => [...prevPosts, ...data.posts]); // Adaugă posturile la lista curentă
      setPosts(data.posts); 
  
      setTotalPosts(data.totalPosts); 
      
        // Totalul de posturi din baza de date
      } catch (error) {
        console.error("Eroare la încărcarea posturilor:", error);
      }
    };

    fetchPosts();
  }, [currentPage, limit, category]);



  return { posts, totalPosts };
};

export default useCategoryPosts;