import React from "react";

const MyProducts = () => {
  const products = [
    {
      id: 1,
      image: "https://via.placeholder.com/40", // sample image
      name: "Orange Juice",
      category: "Beverage",
      price: 100,
      status: "Pending",
    },
  ];

  return (
    <div>
      <h1 className="text-primary font-bold text-4xl text-center my-10">
        My Products: <span className="text-accent">10</span>
      </h1>

      <div className="w-[90%] mx-auto">
        {/* Header Row */}
        <div
          className="bg-[#F9FAFB] flex items-center justify-between p-2 
            rounded-t-lg font-semibold text-gray-700"
        >
          <h1 className="w-[5%] text-center">SL No</h1>
          <h1 className="w-[10%] text-center">Image</h1>
          <h1 className="w-[20%] text-center">Product Name</h1>
          <h1 className="w-[15%] text-center">Category</h1>
          <h1 className="w-[10%] text-center">Price</h1>
          <h1 className="w-[10%] text-center">Status</h1>
          <h1 className="w-[30%] text-center">Actions</h1>
        </div>

        {/* Data Rows */}
        {products.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-2 border border-gray-300"
          >
            <p className="w-[5%] text-center">{index + 1}</p>

            <div className="w-[10%] flex justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 rounded bg-gray-200"
              />
            </div>

            <p className="w-[20%] text-center">{product.name}</p>
            <p className="w-[15%] text-center">{product.category}</p>
            <p className="w-[10%] text-center">${product.price}</p>

            <div className="w-[10%] flex justify-center">
              <span className="px-3 py-1 bg-yellow-400 text-white text-sm rounded-full">
                {product.status}
              </span>
            </div>

            <div className="w-[30%] flex justify-center gap-2">
              <button className="px-3 py-1 text-sm border border-purple-400 text-purple-500 rounded-md hover:bg-purple-50">
                Edit
              </button>
              <button className="px-3 py-1 text-sm border border-red-400 text-red-500 rounded-md hover:bg-red-50">
                Delete
              </button>
              <button className="px-3 py-1 text-sm border border-green-400 text-green-500 rounded-md hover:bg-green-50">
                Make Sold
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;