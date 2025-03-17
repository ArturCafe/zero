
import { useState, useEffect } from "react";
import { BACKEND_URI } from "../config/constants";
import axios from "axios";
import { useSearch } from "../context/search";

const useHomePosts = ({ currentPage, limit, category }) => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const { name } = useSearch(); // Get search term from context

  useEffect(() => {

    const fetchPosts = async () => {

      try {
        const { data } = await axios.get( `${BACKEND_URI}/v1/posts/get-posts`, {
          params: {currentPage , limit , category, name},
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
  }, [currentPage, limit, category, name]);

   

  return { posts, totalPosts };
};

export default useHomePosts;