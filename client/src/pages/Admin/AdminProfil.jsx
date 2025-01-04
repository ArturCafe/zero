import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URI } from "../../config/constants";
import AdminMenu from "../../components/Layout/AdminMenu";


const AdminProfil = () => {

  
  const [auth, setAuth] = useAuth();
  
  const [name, setName] = useState("name");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [id, setId] = useState("");
  
 
  
  
  useEffect(() => {
    const { email, name, address, _id , phone} = auth?.user;
    setName(name);
  //  setPhone(phone);
    setId(_id);
  //  setEmail(email);
 //   setAddress(address);
  }, [auth?.user]);

  //console.log(auth.user?.avatar);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const postData = new FormData();
      postData.append("name", name);
      postData.append("email", email);
      postData.append("address", address);
      postData.append("phone", phone);
      postData.append("id",  id);
     
      avatar && postData.append("avatar", avatar);
      

      const { data } = axios.put(
       // `/api/v1/posts/update-post/${id}`,
       `${BACKEND_URI}/api/v1/auth/update-profile/${auth?.user?._id}`,
        postData
      );
   //   if (data?.success) {
     

      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data.updateuser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updateuser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Profil"}>
    <div className="container-fluid m-3 p-3">
      <div className="row">

        <div className="col-md-3">
        <AdminMenu />
        </div>
        
        <div className="col-md-9">
          <h1>Update Profil</h1>
          <div className="m-1 w-75">
         
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                Upload avatar
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                 onChange={(e) => setAvatar(e.target.files[0])}
               // onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            <div className="mb-3">
            {avatar ? (
                  <div className="text-center">
                    <img
                       src={URL.createObjectURL(avatar)}
                    
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                       src={`${BACKEND_URI}${auth.user?.avatar}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
            </div>

            <div className="mb-3">
            <h4>name</h4>
              <input
                type="text"
              // value={auth.user.name}
               value={name}
                placeholder="write a name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="mb-3">
            <h4>email</h4>
            <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                //    id="exampleInputEmail1"
                    placeholder="Enter Your Email "
                   
                  />
           
            </div>

            <div className="mb-3">
            <h4>telephone</h4>
            <input
                    type="text"
                  //  value={auth.user.phone}
                 //  value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                   // id="exampleInputEma"
                    placeholder="Enter Your Phone"
                  />
            </div>

            <div className="mb-3">
                 <h4>address</h4>
                  <input
                    type="text"
                   // value={auth.user.address}
                   value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
             //       id="exampleInputEmail1"
                    placeholder="Enter Your Address"
                  />

            </div>
            
            <div className="mb-3">
              <button className="btn btn-primary" 
              onClick={handleUpdate}
              >
                UPDATE Profile
              </button>
            </div>
            <div className="mb-3">
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default AdminProfil;
