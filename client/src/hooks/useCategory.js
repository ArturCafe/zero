import { useState, useEffect } from "react";
import { BACKEND_URI } from "../config/constants";
import axios from "axios";



export default function useCategory() {

  const [categories, setCategories] = useState([]);


  const getCategories = async () => {

    try {
      const { data } = await axios.get(
        
    
        `${ BACKEND_URI }/v1/category/get-category`

      );
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

 return categories;
}




