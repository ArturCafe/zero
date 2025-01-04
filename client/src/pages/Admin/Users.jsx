
import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { BACKEND_URI } from "../../config/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "antd";
import { Link } from "react-router-dom";


const Users = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  
  console.log(userId);
  

  //getall products
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        
       // "http://62.164.216.71:8080/api/v1/auth/get-users"
       `${BACKEND_URI}/v1/auth/get-users`
      
      );
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllUsers();
  }, []);
 //delete category

 const handleDelete = async () => {
 
  
  try {
    const { data } = await axios.delete(

      //`http://62.164.216.71:8080/api/v1/auth/delete-user/${userId}`
       `${BACKEND_URI}/v1/auth/delete-user/${userId}`

    );
    if (data.success) {
      toast.success(` is deleted`);

      getAllUsers();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Somtihing went wrong");
  }
};
  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
       
        <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Dellete</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                        
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete()
                              setUserId(c._id)
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>

    
      </div>
    </Layout>
  );
};

export default Users;
