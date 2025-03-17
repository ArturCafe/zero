import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URI } from "../../config/constants";
import AdminMenu from "../../components/Layout/AdminMenu";

const AdminProfil = () => {
  const [auth, setAuth] = useAuth();


  // Inițializăm state-urile cu datele utilizatorului sau fallback values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [id, setId] = useState("");

  useEffect(() => {
    if (auth?.user) {
      const { email, name, address, _id, phone } = auth.user;
      setName(name || "");
      setPhone(phone || "");
      setId(_id || "");
      setEmail(email || "");
      setAddress(address || "");
    }
  }, [auth?.user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const postData = new FormData();
      postData.append("name", name);
      postData.append("email", email);
      postData.append("address", address);
      postData.append("phone", phone);
      postData.append("id", id);

      if (avatar) postData.append("avatar", avatar);

      const { data } = await axios.put(
        `${BACKEND_URI}/v1/auth/update-profile/${auth?.user?._id}`,
        postData
      );

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data.updateuser });
        let ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = data.updateuser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.error(error);
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
              {/* Upload Avatar */}
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  Upload avatar
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              {/* Avatar Preview */}
              <div className="mb-3 text-center">
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="Avatar Preview"
                    height="200px"
                    className="img img-responsive"
                  />
                ) : auth.user?.avatar ? (
                  <img
                    src={`${BACKEND_URI}${auth.user.avatar}`}
                    alt="Current Avatar"
                    height="200px"
                    className="img img-responsive"
                  />
                ) : (
                  <p>No avatar uploaded</p>
                )}
              </div>

              {/* Name */}
              <div className="mb-3">
                <h4>Name</h4>
                <input
                  type="text"
                  value={name}
                  placeholder="Enter name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <h4>Email</h4>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <h4>Phone</h4>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  placeholder="Enter your phone"
                />
              </div>

              {/* Address */}
              <div className="mb-3">
                <h4>Address</h4>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  placeholder="Enter your address"
                />
              </div>

              {/* Update Button */}
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProfil;
