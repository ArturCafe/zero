import React, { useState, useEffect } from "react";
import { BACKEND_URI } from "../config/constants";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import AdminMenu from "../components/Layout/AdminMenu";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import Header from "../components/Layout/Header";
import { AiOutlineReload } from "react-icons/ai";
import { useAuth } from "../context/auth";
import "../styles/Homepage.css";
import SideboardMenu from "../components/Layout/SideboardMenu";





const FotoPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();

  const photos = posts.filter((post) => post.photo.length > 0);


  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        
        //"http://62.164.216.71:8080/api/v1/category/get-category"
       `${BACKEND_URI}/v1/category/get-category`
      
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getAllCategory();
    //
    //
    getAllPosts();
    //getTotal();
  }, []);
  //get products
  const getAllPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(

       //"http://62.164.216.71:8080/api/v1/posts/get-posts",
      `${BACKEND_URI}/v1/posts/get-posts`
      
      );
      setLoading(false);
      setPosts(data.posts);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        
       // "http://62.164.216.71:8080/api/v1/posts/posts-count"
        `${BACKEND_URI}/v1/posts/get-count`
      
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        
       // `http://62.164.216.71:8080/api/v1/posts/post-list/${page}`
        `${BACKEND_URI}/v1/posts/post-list/${page}`
      
      );
      setLoading(false);
      setPosts([...posts, ...data?.posts]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];

    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllPosts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterPost();
  }, [checked, radio]);

  //get filterd product
  const filterPost = async () => {
    try {
      const { data } = await axios.post(
        
        //"http://62.164.216.71:8080/api/v1/posts/post-filters"
        `${BACKEND_URI}/v1/posts/post-filters`
        
        , {
        checked,
        radio,
      });
      setPosts(data?.posts);
    } catch (error) {
      console.log(error);
    }
  };
 // console.log();
  return (
    <Layout >
      <Header />

      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
       
        <div className="d-flex flex-column">
      
  
            <SideboardMenu/>
          </div>
         
          
          </div>   
        <div className="col-md-9 ">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {photos?.map((p) => (
              <div className="card m-2" key={p._id}>
             {p.photo.length > 0 ? <div>

                <img
                  src={`${BACKEND_URI}${p.photo}`}
                  className="card-img-top"
                  alt="gtyr5w"
                />
              </div>:<div>
              <video
                            preload="auto"
                            width="287"
                            height="240"
                            controls
                          >
                            <source src={`${BACKEND_URI}${p?.video}`} />
                            ;Your browser does not support the video tag.
                          </video>
                </div>}

                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p?.name}</h5>
                    <h5 className="card-title card-price">
                      likes_
                      {}
                    </h5>
                    <h6 className="card-title card-price">
                      comments :{p?.comments.length}</h6>
                  </div>
                  <p className="card-text ">
                    {p?.description?.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/post/${p._id}`)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {posts && posts.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FotoPage;