import React from "react";
import { NavLink } from "react-router-dom";


const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-photopost"
            className="list-group-item list-group-item-action"
          >
            Create PhotoPost
          </NavLink>

          <NavLink
            to="/dashboard/admin/create-videopost"
            className="list-group-item list-group-item-action"
          >
            Create VideoPost
          </NavLink>

          <NavLink
            to="/dashboard/admin/posts"
            className="list-group-item list-group-item-action"
          >
            Posts
          </NavLink>

          <NavLink
            to="/dashboard/admin/profil"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>

           <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink> 
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
