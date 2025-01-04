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
const { Option } = Select;

const CreateVideoPost = () => {

  const navigate = useNavigate();
  const categorile = useCategory();


  const [name, setName] = useState("name");
  const [description, setDescription] = useState("description");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [video, setVideo] = useState([]);
  const [auth ] = useAuth();


  //create product function
  const handleCreate = async (e) => {

    e.preventDefault();
    try {
      const postData = new FormData();
      for (let key in video) {
        postData.append("video", video[key]);
        
      }
      postData.append("name", name);
      postData.append("video", video);
      postData.append("category", category);
      postData.append("description", description);
      postData.append("postedBy", auth.user._id );

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
      toast.error("something went wrong");
    }
  };

  return (
    <Layout >
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create VideoPost</h1>
            <div className="m-1 w-75">
              <Select
             
                placeholder="fa click pentru a selecta"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categorile?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload "}
                 
          <input
            type="file"
            name="videos"
            id="videos"
            multiple
            className="form-control"
            accept=".mp4, .mkv"
            onChange={(e) => {
              setVideo(e.target.files);
            }}
          />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>


              <div className="mb-3">

                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PosT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateVideoPost