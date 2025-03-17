import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URI } from "../../config/constants";
import useCategory from "../../hooks/useCategory";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd"; // Import pentru loader
const { Option } = Select;

const CreateVideoPost = () => {
  const navigate = useNavigate();
  const categorile = useCategory();

  const [name, setName] = useState("name");
  const [description, setDescription] = useState("description");
  const [category, setCategory] = useState("");
  const [video, setVideo] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false); // Gestionare stare de încărcare

  // Funcția pentru a crea postarea video
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true); // Pornim loaderul
    try {
      const postData = new FormData();
      for (let key in video) {
        postData.append("video", video[key]);
      }
      postData.append("name", name);
      postData.append("video", video);
      postData.append("category", category);
      postData.append("description", description);
      postData.append("postedBy", auth.user._id);

      const { data } = await axios.post(
        `${BACKEND_URI}/v1/posts/create-videopost`,
        postData
      );
      if (data) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/posts");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false); // Oprim loaderul
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create VideoPost</h1>
            <div className="m-1 w-75">
              <Select
                placeholder="Click to select category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
              >
                {categorile?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
         
                  <input
                    type="file"
                    name="videos"
                    id="videos"
                    multiple
                    className="form-control"
                    accept=".mp4, .mkv, .webm"
                    onChange={(e) => setVideo(e.target.files)}
                  />
                </label>
              </div>
              
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  onClick={handleCreate}
                  disabled={loading}
                >
                  {loading ? <Spin size="small" /> : "CREATE POST"}
                </button>
              </div>
              {loading && (
                <div className="text-center mt-3">
                  <Spin size="large" />
               
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateVideoPost;

