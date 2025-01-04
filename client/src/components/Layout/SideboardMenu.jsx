import React from "react";
import { NavLink } from "react-router-dom";



const 
SideboardMenu = () => {

  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h4> Categorii </h4>
          <NavLink
            to="/foto"
            className="list-group-item list-group-item-action"
          >
            foto
          </NavLink>
        
          <NavLink
            to="/video"
            className="list-group-item list-group-item-action"
          >
            video
           </NavLink>
        </div>
      </div>
    </>
  );
};

export default SideboardMenu;
