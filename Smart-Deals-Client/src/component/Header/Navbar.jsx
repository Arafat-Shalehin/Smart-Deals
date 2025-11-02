import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "bg-linear-to-r from-accent to-secondary text-white" // active style
      : "text-gray-700"; // normal style

  const linksData = [
    { to: "/", label: "Home" },
    { to: "/allProducts", label: "All Products" },
    ...(user
      ? [
          { to: "/myProducts", label: "My Products" },
          { to: "/myBids", label: "My Bids" },
          { to: "/createProducts", label: "Create Products" },
        ]
      : []),
  ];

  const links = (
    <div className="flex flex-col lg:flex-row lg:items-center lg:gap-3 gap-2">
      {linksData.map(({ to, label }) => (
        <li key={to}>
          <NavLink to={to} className={getNavLinkClass}>
            {label}
          </NavLink>
        </li>
      ))}
    </div>
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
              rounded-box z-1 w-30 mt-3 p-2 shadow font-semibold"
            >
              {links}
            </ul>
          </div>
          <a href="/" className="text-2xl text-primary font-bold ml-2 lg:ml-0">
            Smart <span className="text-accent">Deals</span>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-3">
              <img
                className="w-10 rounded-full"
                src={user.photoURL}
                alt={user.displayName}
              />
              <button
                onClick={handleLogOut}
                className="
              border border-secondary text-accent px-6 py-2 
              rounded font-semibold hover:opacity-90"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/register"
                className="bg-linear-to-r from-accent to-secondary text-white
                font-semibold px-8 py-2 rounded
                hover:scale-110 transition"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="border border-linear-to-r from-accent 
                to-secondary rounded text-accent px-6 py-2 hover:scale-110 transition"
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
