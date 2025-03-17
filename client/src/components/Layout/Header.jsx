import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";



const Header = () => {
  const [auth, setAuth] = useAuth();

  



  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

        
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
               Home
            </Link>

            <SearchInput />

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            
            

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">

                    <NavLink
                      className="nav-link dropdown-toggle"
                     //className="navbar-brand dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                      
                    >
               
                      {auth?.user?.name}
                    </NavLink>

                    <ul className="dropdown-menu">
                      <li> {  auth?.user?.role === 1 ? <NavLink
                          to={`/dashboard/admin`}
                          className="dropdown-item"
                        > 
                          Dashboard
                        </NavLink>
                       :
                        <NavLink

                          to={'/login'}
                          className="dropdown-item"
                        >
                          
                        </NavLink>
                         }
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
             
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};


export default Header;
