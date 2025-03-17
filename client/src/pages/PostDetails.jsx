import React, { useState, useEffect} from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import CommentPost from "../components/Comment/CommentPost";
import { BACKEND_URI } from "../config/constants";



const PostDetails = () => {

  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
 // const [relatedProducts, setRelatedProducts] = useState([]);
	const [likes, setLikes] = useState(0);
  const [auth ] = useAuth();
  const [userId, setUserId] = useState();
  const [user, setUser] = useState({});


 useEffect(() => {
    
    if (params?.id) {
      getPost();
   };
    setUserId(auth?.user?._id);
    setUser(auth?.user);
  }, [ auth]);



  const getPost = async () => {
    try {
      const { data } = await axios.get(

       // `http://62.164.216.71:8080/api/v1/posts/get-post/${params.id}`
        `${BACKEND_URI}/v1/posts/get-post/${params.id}`

      );
     //
      setPost(data);
      setLikes(data.post.likes)
     // getSimilarProduct(data?.post._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };




  const likePost = async (e) => {
    e.preventDefault();


    if (auth.user) {
       try {
     
      const  {data} = await axios.put(
        
       // `http://62.164.216.71:8080/api/v1/posts/like-post/${params.id}`
        `${BACKEND_URI}/v1/posts/like-post/${params.id}`
        
        ,
        {userId:userId} );
      
           toast.success(" Successfully");
         setLikes(data.data.likes);
    
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
 
    } else {
      toast("autifincate pentru a pune like");
    }
    };


  
  
  return (
    <Layout>
  <div>
    <div className="row container product-details">
      <div className="col-md-6">
      
        <h6>Name :{post?.post?.name}</h6>  <hr />
      
       
           {post?.post?.photo.length > 0 ? <div>

              <img
                src={`${BACKEND_URI}${post?.post?.photo}`}
                className="card-img-top"
                alt="gtyr5w"
              />
            </div>:<div>
            {post?.post?.video.map((video) => {
                        return (
                          <video
                            preload="auto"
                            width="450"
                            height="350"
                            controls
                          >
                            <source src={`${BACKEND_URI}${video}`} />
                            ;Your browser does not support the video tag.
                          </video>
                        );
                      })}
            
              </div>
              }

      </div>
      
       <div className="col-md-6 product-details-info">
        <h1 className="text-center">Comments</h1>
        <hr />
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
            
            </div>
            </div>
            </div>

                <div >
              <CommentPost  post={post?.post} user ={user} />
                              </div>
           
      </div>
      
      <div className="col-md-6 product-details-info">
   
        <h1 className="text-center">Post Details</h1>
        <button 

      onClick={likePost}
           
                 >    laik   </button> 
        <hr />
        <h6>like : {likes?.length}</h6>
        <h6>autor : {post?.post.postedBy.name}</h6>
     
       <p>{post?.post.description}</p>
      </div>
    
    </div>
    <hr />   
    </div>  
    
    </Layout>
  );
};

export default PostDetails;
