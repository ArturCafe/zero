import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { BACKEND_URI } from "../config/constants";

const About = () => {
  const [auth] = useAuth();

  
  return (
    <Layout title={"About us "}>
      <div className="row contactus ">
        <div className="col-md-6 ">
        <img
                src={`${BACKEND_URI}${auth?.user?.avatar}`}
                className="card-img-top"
                alt="gtyr5w"
                style={{ width: "70%" }}
              />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
