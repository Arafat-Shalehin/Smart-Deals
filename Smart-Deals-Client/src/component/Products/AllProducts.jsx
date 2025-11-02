import React, { use } from "react";

const allProductsPromise = fetch("http://localhost:3000/products").then((res) =>
  res.json()
);

const AllProducts = () => {
  const allProduct = use(allProductsPromise);
  console.log(allProduct);

  return (
    <div>
      <div className="text-center">
        <h1 className="text-primary font-bold text-4xl text-center my-10">
          All <span className="text-accent">Products</span>
        </h1>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto
      w-[90%] mb-10 text-left"
        >
          {allProduct.map((product) => (
            <div key={product._id}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-90 lg:w-120 mx-auto p-3">
                {/* Product Image Placeholder */}
                <div className="rounded-lg h-40 w-full">
                  <img src={product.image} alt={product.title} />
                </div>

                {/* Product Info */}
                <div className="mt-3">
                  <h2 className="text-lg font-medium text-gray-800 leading-tight line-clamp-1">
                    {product.title} [ {product.usage} ]
                  </h2>
                  <p className="text-purple-600 text-lg font-medium mt-1">
                    $ {product.price_min} - {product.price_max}
                  </p>
                </div>

                {/* Button */}
                <button className="mt-3 w-full border border-purple-500 text-purple-600 text-sm font-medium py-2 rounded-md hover:bg-purple-50 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
