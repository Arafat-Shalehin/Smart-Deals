import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allProducts">All Products</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/myProducts">My Products</NavLink>
          </li>
          <li>
            <NavLink to="/myBids">My Bids</NavLink>
          </li>
          <li>
            <NavLink to="/createProducts">Create Products</NavLink>
          </li>
        </>
      )}
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Successfully LogOut");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm md:px-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 
              rounded-box z-1 mt-3 w-52 p-2 shadow font-semibold"
            >
              {links}
            </ul>
          </div>
          <a href="/" className="text-2xl font-bold ml-2 lg:ml-0">
            Smart <span className="text-purple-600">Deals</span>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-3">
              <img
                className="w-10 rounded-full"
                src={user.photoURL}
                alt={user.displayName}
              />
              <button onClick={handleLogOut} className="btn bg-purple-400
              text-white px-6">
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/register"
                className="bg-linear-to-r from-[#632EE3] 
                to-[#9F62F2] text-white font-semibold px-8 py-2 rounded
                hover:scale-110 transition"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="border border-linear-to-r from-[#632EE3] 
                to-[#9F62F2] rounded text-purple-600 px-6 py-2 hover:scale-110 transition"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
