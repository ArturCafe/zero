import React, {  useRef } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import useGetPosts from "../../hooks/useGetPosts";
import { BACKEND_VPS } from "../../config/constants";
import { BACKEND_URI } from "../../config/constants";
import { Link } from "react-router-dom";

const PostsAdmin = () => {
  const posts = useGetPosts();
  
      
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
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Select Post for Update in List</h1>
          <div className="d-flex flex-wrap">
            {posts?.map((p, index) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/post/${p._id}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  {p.photo?.length > 0 ? (
                    <div>
                      <img
                        src={`${BACKEND_URI }${p.photo}`}
                        className="card-img-top"
                        alt={p.name || "Post image"}
                      />
                    </div>
                  ) : p.video?.length > 0 ? (
                    <div>
                      <video
                        ref={(el) => (videoRefs.current[index] = el)} 
                        preload="auto"
                        width="287"
                        height="240"
                        controls
                        onPlay={() => handleVideoPlay(index)} 
                        > 
                        <source src={`${BACKEND_URI }${p.video}`} />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <div>No media available</div>
                  )}

                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostsAdmin;
