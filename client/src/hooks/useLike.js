import { useState, useEffect } from "react";
import { BACKEND_URI } from "../config/constants";
import axios from "axios";





export default function useLike() {
    const [lakes, setLakes] = useState([0]);
    
    
    const upLakies = async () => {
    try {
      const { data } = await axios.post(

      
        `${ BACKEND_URI }/v1/posts/create-uplakes`
      
      );
      setLakes(data?.category);
    } catch (error) {
      console.log(error); 
   } };
    useEffect(() => {
      upLakies();
    }, []);
    
    return lakes;
  }
  
  