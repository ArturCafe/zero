import React, { useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox } from "antd";
import { BACKEND_URI } from "../../config/constants";


       

const SideboardPostsAdmin = ({ posts, select, setSelect  }) => {
 
  const [allSelect, setAllSelect] = useState([]);


  const handleSelectAll = () => {
    setAllSelect(allSelect.length === posts.length ? [] : posts.map((p) => p._id));
  };

 /*
  const deleteFetch  = async () => {
    
      const selectedIds = allSelect.length > 0 ? allSelect : select;
    
      if (selectedIds.length === 0) {
        alert("Nu există posturi selectate pentru a fi șterse.");
        return;
      }
    
      try {
        const { response } = await axios.delete(`${BACKEND_URI}/v1/posts/dellete-posts`, {
          data: { selectedIds }, // Trimitem array-ul corect
        });
    
        if (response.success) {
          toast.success("Ștergere efectuată cu succes");
          setAllSelect([]); 
          setSelect([]);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        const errorMessage = error.response?.datad?.message || "Eroare la ștergerea posturilor";
       console.log(errorMessage);
       
        toast.error(errorMessage);
      }
    };
    */

const deleteFetch = async () => {
  const selectedIds = allSelect.length > 0 ? allSelect : select;

  if (selectedIds.length === 0) {
    alert("Nu există posturi selectate pentru a fi șterse.");
    return;
  }

  try {
    const response = await axios.delete(`${BACKEND_URI}/v1/posts/dellete-posts`, {
      data: { selectedIds }, // Trimitem array-ul corect în data
    });


    // Verificăm răspunsul
    if (response.data.success) {
      toast.success("Ștergere efectuată cu succes");
      setAllSelect([]);
      setSelect([]);
    } else {
      toast.error(response.data.message || "Eroare la ștergerea posturilor");
    }
  } catch (error) {
    
    const errorMessage = error.response?.data?.message || error.message || "Eroare la ștergerea posturilor";

    toast.error(errorMessage); // Afișează eroarea
  }
};


  
  return (
    <div className="text-center">
      <div className="list-group dashboard-menu">

        <h4>Select Option</h4>

       
        <button onClick={handleSelectAll} className="list-group-item list-group-item-action">
         
           Select All

          <Checkbox checked={allSelect.length === posts.length && posts.length > 0} />
         
        </button>

        <button onClick={deleteFetch} className="list-group-item list-group-item-action">
          Delete 
        </button>
      </div>
    </div>
  );
};

export default SideboardPostsAdmin;

/* 
const SideboardPostsAdmin = ({ posts, setPosts, allSelect, setAllSelect }) => {
  useEffect(() => {
    setAllSelect([]);
  }, [posts]);

  const handleSelectAll = () => {
    setAllSelect(allSelect.length === posts.length ? [] : posts.map((p) => p._id));
  };

  const deleteAll = async () => {
    if (allSelect.length === 0) {
      alert("Nu există posturi selectate pentru a fi șterse.");
      return;
    }

    try {
      const { data } = await axios.delete(`${BACKEND_URI}/v1/posts/delete-posts`, {
        params: { allSelect },
      });

      if (data.success) {
        toast.success("Ștergere efectuată cu succes");

        // 🔥 Elimină posturile șterse din starea `posts`
        setPosts((prevPosts) => prevPosts.filter((p) => !allSelect.includes(p._id)));

        setAllSelect([]); // Resetează selecția
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Eroare la ștergerea posturilor";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="text-center">
      <div className="list-group dashboard-menu">
        <h4>Select Option</h4>

        <button onClick={handleSelectAll} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          Select All
          <Checkbox checked={allSelect.length === posts.length && posts.length > 0} />
        </button>

        <button onClick={deleteAll} className="list-group-item list-group-item-action">
          Delete
        </button>
      </div>
    </div>
  );
};


*/