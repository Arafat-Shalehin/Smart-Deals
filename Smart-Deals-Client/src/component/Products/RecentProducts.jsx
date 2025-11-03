import React from "react";
import { useNavigation } from "react-router-dom";
import Loader from "../Loader/Loader";

const RecentProducts = ({ product }) => {

  const { image, title, usage, price_max, price_min } = product;

  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <Loader />;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-90 lg:w-120 mx-auto p-3">
      {/* Product Image Placeholder */}
      <div className="rounded-lg h-40 w-full">
        <img src={image} alt={title} />
      </div>

      {/* Product Info */}
      <div className="mt-3">
        <h2 className="text-lg font-medium text-gray-800 leading-tight line-clamp-1">
          {title} [ {usage} ]
        </h2>
        <p className="text-purple-600 text-lg font-medium mt-1">$ {price_min} - {price_max}</p>
      </div>

      {/* Button */}
      <button className="mt-3 w-full border border-purple-500 text-purple-600 text-sm font-medium py-2 rounded-md hover:bg-purple-50 transition">
        View Details
      </button>
    </div>
  );
};

export default RecentProducts;
