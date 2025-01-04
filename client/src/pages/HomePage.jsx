import React, { useState,  useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URI } from "../config/constants";
import useHomePosts from "../hooks/useHomePosts";
import Layout from "../components/Layout/Layout";
import Header from "../components/Layout/Header";
import SideboardMenu from "../components/Layout/SideboardMenu";
import Pagination from "../components/Pagination/Pagination"

  // Parametrii de paginare


  const HomePage = () => {
  

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    const { posts, total} = useHomePosts(currentPage);
 

     const videoRefs = useRef([]); // Ref pentru a accesa fiecare video
     // Funcția care oprește alte videoclipuri
     const handleVideoPlay = (index) => {
      videoRefs.current.forEach((video, i) => {
        if (i !== index && video) {
          video.pause(); // Oprește toate videoclipurile în afară de cel curent
        }
      });
    };



  return (
    <Layout >
    <Header/>

    <div className="container-fluid row mt-3 home-page" >
      <div className="col-md-3 filters">
     
      <div className="d-flex flex-column">
    

          <SideboardMenu/>
        </div>
       
        
        </div>   
        <div className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">

                    {posts?.map((p, index) => (
            <div className="container pt-5" key={p._id}>
           {p.photo.length > 0 ? <div>

              <img
              src={`${BACKEND_URI}${p.photo}`}c
                className="card-img-top"
                alt="gtyr5w"
              />
            </div>:<div>
            <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    preload="auto"
                    width="538"
                    height="400"
                    controls
                    onPlay={() => handleVideoPlay(index)}
                  >
                          <source src={`${BACKEND_URI}${p?.video}`} />
                          Your browser does not support the video 
                        </video>
              </div>}

              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p?.name}</h5>
                  <h5 className="card-title card-price">
                    likes_
                   {p.likes?.length}
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
                </div>
            </div>
        </div>
      <div className="col-md-7 ">
      
        <div className="d-flex flex-wrap">
          
        </div>
      
      </div>
    </div>
  
 
    <div className="d-flex justify-content-center"  >

<Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={total}
        pageSize={3}
        onPageChange={page => setCurrentPage(page)}
      />

     
    </div>

    </Layout>

  );
};

export default HomePage;