import { useState, useEffect } from "react";
import { BACKEND_URI } from "../config/constants";
import axios from "axios";


const useSearchPosts = (currentPage, limit, name) => {

  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Construim obiectul params cu toți parametrii
        const params = {
          currentPage,
          limit,
         
          name       // Adăugăm numele de căutare
        };

        // Trimitem cererea GET cu parametrii
        const { data } = await axios.get(`${BACKEND_URI}/v1/posts/get-posts`, {
          params  // Axios va construi automat query string-ul
        });

        // Setăm posturile și totalul
        setPosts(data.posts);
        setTotalPosts(data.totalPosts);  // Asigură-te că răspunsul are 'totalPosts'
      } catch (error) {
        console.error("Eroare la încărcarea posturilor:", error);
      }
    };

    // Apelăm funcția fetchPosts pentru a obține posturile
    fetchPosts();
  }, [currentPage, limit, category, name]); // Adăugăm toate dependențele relevante

  return { posts, totalPosts };
};

export default useSearchPosts;
