import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import SideboardPostsAdmin from "../../components/Layout/SideboardPostsAdmin";
import Layout from "../../components/Layout/Layout";
import useCategoryPosts from "../../hooks/useCotegoryPosts";
import { Checkbox } from "antd";
import { BACKEND_URI } from "../../config/constants";
import Pagination from "../../components/Pagination/Pagination";


const PostsCategoryAdmin = () => {
  let limit = 4;
  const { id } = useParams();
  const [select, setSelect] = useState([]);
   
 
  const [currentPage, setCurrentPage] = useState(1);

  const { posts, totalPosts } = useCategoryPosts({
    currentPage,
    category: id,
    limit,
    
  });


    
  const handleSelect = (value, postId) => {
    let updatedSelection = [...select];

    if (value) {
      updatedSelection.push(postId);
    } else {
      updatedSelection = updatedSelection.filter((p) => p !== postId);
    }

    setSelect(updatedSelection);
    
  };

  
  return (
    <Layout>
    <div className="row dashboard">
      <div className="col-md-3">
        
        <SideboardPostsAdmin
        posts={posts} 
        select={select}
        setSelect={setSelect}
        />

      </div>
      <div className="col-md-9">
        <h1 className="text-center">Select a Post to Update</h1>
        <div className="d-flex flex-wrap justify-content-center">
          {posts.length > 0 ? (
            posts.map((p) => (
              <div key={p._id} className="card m-2 shadow-sm" style={{ width: "18rem" }}>
                <Checkbox
                  checked={select.includes(p._id)}
                  onChange={(e) => handleSelect(e.target.checked, p._id)}
                >
                  {p.name}
                </Checkbox>
                <Link to={`/dashboard/admin/post/${p._id}`} className="product-link">
                  {p.photo?.length > 0 ? (
                    <img
                      src={`${BACKEND_URI}${p.photo}`}
                      className="card-img-top rounded"
                      alt="Post"
                    />
                  ) : (
                    <video preload="auto" width="100%" height="240" controls className="rounded">
                      <source src={`${BACKEND_URI}${p.video}`} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <div className="card-body text-center">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text text-muted">{p.description}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center w-100 mt-4 text-muted">No posts available in this category.</p>
          )}
        </div>
      </div>

      <div className="col-md-7">
          <div className="d-flex flex-wrap">Pagina: {currentPage}</div>
      </div>

    </div>
                           

      <div className="d-flex justify-content-center">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={totalPosts}
          pageSize={limit}
          onPageChange={(page) => {
            if (page !== currentPage) setCurrentPage(page);
          }}
        />
      </div>
    </Layout>
  );
};

export default PostsCategoryAdmin;

/*  
<SideboardPostsAdmin posts={posts} setPosts={setPosts} allSelect={allSelect} setAllSelect={setAllSelect} />

*/
