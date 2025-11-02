import React, { use } from "react";
import RecentProducts from "./RecentProducts";
import { Link } from "react-router-dom";

const LatestProducts = ({ latestProductsPromise }) => {
  const latestProducts = use(latestProductsPromise);
  console.log(latestProducts);
  return (
    <div className="text-center">
      <h1 className="text-primary font-bold text-4xl text-center my-10">
        Recent <span className="text-accent">Products</span>
      </h1>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto
      w-[90%] mb-10 text-left"
      >
        {latestProducts.map((product) => (
          <RecentProducts key={product._id} product={product}></RecentProducts>
        ))}
      </div>
      <Link to='/allproducts'>
        <button
          className="bg-linear-to-r from-accent to-secondary
      text-white font-semibold sm:px-8 md:px-12 lg:px-20 py-2 lg:py-4 rounded mb-10 hover:scale-110 transition"
        >
          Show All
        </button>
      </Link>
    </div>
  );
};

export default LatestProducts;
