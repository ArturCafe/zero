
import React from "react";
import useCategory from "../../hooks/useCategory";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";

const PostsAdmin = () => {
  const categories = useCategory();

  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Select a Category to Manage Posts</h1>
          <div className="d-flex flex-wrap justify-content-center">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/dashboard/admin/categoryposts/${cat._id}`}
                  className="product-link text-decoration-none"
                >
                  <div className="card m-2 p-3 rounded shadow-sm" style={{ width: "18rem" }}>
                    {cat.photo ? (
                      <img
                        src={cat.photo}
                        className="card-img-top rounded"
                        alt={cat.name}
                      />
                    ) : (
                      <div className="text-center p-3">
                        <small className="text-muted">No image available</small>
                      </div>
                    )}
                    <div className="card-body text-center">
                      <h5 className="card-title">{cat.name}</h5>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center w-100 mt-4 text-muted">No categories available</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostsAdmin;
