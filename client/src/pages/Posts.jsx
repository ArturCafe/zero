import React, { useState, useEffect } from "react";
import { BACKEND_URI } from "../config/constants";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import Header1 from "../components/Layout/Header1";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";

const Posts = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(

        //"/api/v1/category/get-category"
      
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

        //"http://localhost:8080/api/v1/posts/get-post"
        `${BACKEND_URI}/v1/posts/get-post`
        
        ,
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
        
        //"http://62.164.216.71:8080/api/v1/posts/posts-count"
      `${BACKEND_URI}/v1/posts/posts-count`
      
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

  return (
    <Layout title={"ALl Products - Best offers "}>
      <Header1 />

      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <div className="d-flex flex-column">
            <img
              src="/images/qwer.png"
              className="banner-img"
              alt="bannerimage"
              width={"100%"}
            />
          </div>

          <div className="d-flex">
            <h4 className="text-center mt-4">user info</h4>
          </div>
          <h4 className="text-center mt-4">user info</h4>
        </div>

        <div className="col-md-9 ">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {posts?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`/api/v1/posts/post-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      likes
                      {p.price}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
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

export default Posts;
