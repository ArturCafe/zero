import { useState, useEffect } from "react";
import { BACKEND_URI } from "../config/constants";
import axios from "axios";

const useFilteredPosts = (currentPage, limit, category) => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Construim obiectul params doar cu categoria
        const params = {
          currentPage,
          limit,
          category, // Adăugăm doar categoria ca parametru de filtrare
        };

        // Trimitem cererea GET cu parametrii
        
         const { data } = await axios.get( `${BACKEND_URI}/v1/posts/get-posts?${currentPage}`, {
              params
            });

        // Setăm posturile și totalul
        setPosts(data.posts);
        setTotalPosts(data.total);
      } catch (error) {
        console.error("Eroare la încărcarea posturilor:", error);
      }
    };

    // Apelăm funcția fetchPosts pentru a obține posturile
    fetchPosts();
  }, [currentPage, limit, category]); // Dependență doar pentru categorie

  return { posts, totalPosts };
};

export default useFilteredPosts;
