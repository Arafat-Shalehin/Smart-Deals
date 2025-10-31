import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allProducts">All Products</NavLink>
      </li>
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
  );

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
          <a className="text-2xl font-bold ml-2 lg:ml-0">
            Smart <span className="text-purple-600">Deals</span>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold">{links}</ul>
        </div>
        <div className="navbar-end">
          <img
            className="w-10 rounded-full"
            src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="User Photo"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
