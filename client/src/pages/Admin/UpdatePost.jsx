import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URI } from "../../config/constants";
import useCategory from "../../hooks/useCategory";

const { Option } = Select;

const UpdatePost = () => {

    const categories = useCategory();

  const navigate = useNavigate();
  const params = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [video, setVideo] = useState("");
  const [post, setPost] = useState("");
  const [id, setId] = useState("");




  //get single product
  const getSinglePost = async () => {
    try {
      const { data } = await axios.get(

        //`http://62.164.216.71:8080/api/v1/posts/get-post/${params.id}`
         `${BACKEND_URI}/v1/posts/get-post/${params.id}`

      );
      setName(data.post.name);
      setId(data.post._id);
      setDescription(data.post.description);
      setCategory(data.post.category._id);
      setPost(data.post)
    } catch (error) {
      console.log(error);
    }
  };

 
  useEffect(() => {
    getSinglePost();
   
    //eslint-disable-next-line
  }, []);



  

  //create product function
  const handleUpdatevideo = async (e) => {
    e.preventDefault();
    try {
      const postData = new FormData();
      postData.append("name", name);
      postData.append("description", description);
      photo && postData.append("photo", photo);
      video && postData.append("video", video);
      postData.append("category", category);

      const { data } = axios.put(
        //`http://62.164.216.71:8080/api/v1/posts/update-video/${params.id}`,
         `${BACKEND_URI}/v1/posts/update-video/${params.id}`,

        postData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success(" Updated Successfully");
       // navigate("/dashboard/admin/posts");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const postData = new FormData();
      postData.append("name", name);
      postData.append("description", description);
      photo && postData.append("photo", photo);
      video && postData.append("video", video);
      postData.append("category", category);

      const { data } = axios.put(

        //`http://62.164.216.71:8080/api/v1/posts/update-photo/${params.id}`
        `${BACKEND_URI}/v1/posts/update-photo/${params.id}`
        ,
        postData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success(" Updated Successfully");
        navigate("/dashboard/admin/posts");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };


  //delete a product
  const handleDelete = async () => {
    try {
     // let answer = window.prompt("Are You Sure want to delete this product ? ");
     // if (!answer) return;
      const { data } = await axios.delete(

        //`/http://62.164.216.71:8080/api/v1/posts/delete-post/${id}`
           `${BACKEND_URI}/v1/posts/delete-post/${id}`

      );

      if (!data?.success) {
        toast.error(data?.message);
      } else {
        toast.success(" Updated Successfully");
        navigate("/dashboard/admin/posts");
      }
     // toast.success("Product DEleted Succfully");
     // navigate("/dashboard/admin/posts");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout >
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Post</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
{post?.photo?.length > 0 ? 

<div> 

           <div> 
             <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                       src={URL.createObjectURL(photo)}
                    
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                       src={`${BACKEND_URI}${post.photo}`}
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
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE Post
                </button>
              </div>
  </div> 
  : 
  <div>
                
              <div> <label className="btn btn-outline-secondary col-md-12">
                  {video ? video.name : "Upload video"}
                  <input
                    type="file"
                    name="video"
                    accept="video/*"
                    onChange={(e) => setVideo(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {video ? (
                  <div className="text-center">
                    <video
                          preload="auto"
                          width="287"
                          height="240"
                          controls
                        >
                            <source  
                            
                            src={URL.createObjectURL(video)}
                           
                            />
                        
                          Your browser does not support the video tag.
                        </video>
                   
                  </div>
                ) : (
                  <div className="text-center">
                   <video
                          preload="auto"
                          width="287"
                          height="240"
                          controls
                        >
                            <source  
                            
                         src={`${BACKEND_URI}${post?.video}`} 
                       />
                          ;Your browser does not support the video tag.
                        </video>
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
                <button className="btn btn-primary" onClick={handleUpdatevideo}>
                  UPDATE Post
                </button>
              </div>
              
                
                </div>}

              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdatePost;
