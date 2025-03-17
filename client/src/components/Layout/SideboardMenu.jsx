import React, { useRef } from "react";
import { Checkbox } from "antd";

import useCategory from "../../hooks/useCategory"; 
import { useCategorySelect } from "../../context/categorySelect";


const SideboardMenu = () => {
  const categories = useCategory(); 



   
  const [category, setCategory] = useCategorySelect();


  const dropdownRef = useRef(null);

  const handleFilter = (value, id ) => {
  
    
    let all = [...category];


  

    if (value == true) {
      all.push(id); 
    } else if(category == []){
      window.location.reload();
      all = []; 
    }else{
      all = all.filter((c) => c !== id); 
    }
   
    setCategory(all); // Actualizează contextul
    localStorage.setItem("category", JSON.stringify(all)); // Persistă în localStorage
  };


/*
const handleFilter = (value, id) => {
  let updatedCategory = [...category];
  if (value) {
    updatedCategory.push(id); // Adaugă ID-ul dacă e selectat
  } else {
    updatedCategory = updatedCategory.filter((c) => c !== id); // Îndepărtează ID-ul dacă nu e selectat
  }

  if (JSON.stringify(updatedCategory) !== JSON.stringify(category)) {
    setCategory(updatedCategory); // Actualizează contextul doar dacă lista s-a schimbat
    localStorage.setItem("category", JSON.stringify(updatedCategory)); // Persistă în localStorage
  }
}
*/
  return (
    <nav aria-label="Sideboard Navigation" className="text-center bg-white">
      <div className="list-group dashboard-menu ">
        <h4
        >Categories</h4>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Select Category
          </button>
          <ul
            className="dropdown-menu   " 
            style={{ width: '289px' }}
            aria-labelledby="dropdownMenuButton"
            ref={dropdownRef}
          >
             
            {categories && categories.length > 0 ? (
              categories.map((c) => (

                <li key={c.id}
                style={{ backgroundColor: 'rgb(247, 241, 240)', color: 'rgb(255, 255, 255)' }}
                >
                 <Checkbox   
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
                </li>
              ))
            ) : (
              <li className="dropdown-item text-muted">
                No categories available
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SideboardMenu;
