// import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
// import useAxios from "../../hooks/useAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CreateProductForm = () => {
  const [condition, setCondition] = useState("Brand New");

  const { user } = useAuth();
  // const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  const handleCreateAProduct = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const productImage = e.target.productImage.value;
    const min_price = e.target.min_price.value;
    const max_price = e.target.max_price.value;

    console.log({ title, productImage, min_price, max_price });

    const newProduct = { title, productImage, min_price, max_price };

    // axios.post("http://localhost:3000/products", newProduct).then((data) => {
    //   console.log(data.data);
    //   if (data.data.insertedId) {
    //     Swal.fire({
    //       title: "Your product has been created",
    //       icon: "success",
    //       position: 'center',
    //       timer: 1500,
    //       showConfirmButton: false,
    //     });
    //   }
    // });

    // axiosInstance.post("/products", newProduct).then((data) => {
    //   console.log(data.data);
    //     if (data.data.insertedId) {
    //       Swal.fire({
    //         title: "Your product has been created",
    //         icon: "success",
    //         position: 'center',
    //         timer: 1500,
    //         showConfirmButton: false,
    //       });
    //     }
    // });

    axiosSecure.post("/products", newProduct).then((data) => {
      console.log(data.data);
      if (data.data.insertedId) {
        Swal.fire({
          title: "Your product has been created",
          icon: "success",
          position: "center",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-md mt-10 mb-10">
      <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
        Create A Product
      </h2>

      <form onSubmit={handleCreateAProduct} className="space-y-5">
        {/* Title & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Yamaha Fz Guitar for Sale"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-purple-500">
              <option>Select a Category</option>
              <option>Electronics</option>
              <option>Vehicles</option>
              <option>Instruments</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Min Price You want to Sale ($)
            </label>
            <input
              type="number"
              name="min_price"
              placeholder="e.g. 18.5"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Price You want to Sale ($)
            </label>
            <input
              type="number"
              name="max_price"
              placeholder="Optional (default = Min Price)"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Product Condition */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-gray-700">
            Product Condition:
          </span>
          <label className="flex items-center gap-2 cursor-pointer text-sm sm:text-base">
            <input
              type="radio"
              name="condition"
              checked={condition === "Brand New"}
              onChange={() => setCondition("Brand New")}
              className="text-purple-600 focus:ring-purple-500"
            />
            <span>Brand New</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm sm:text-base">
            <input
              type="radio"
              name="condition"
              checked={condition === "Used"}
              onChange={() => setCondition("Used")}
              className="text-purple-600 focus:ring-purple-500"
            />
            <span>Used</span>
          </label>
        </div>

        {/* Product Usage Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Usage Time
          </label>
          <input
            type="text"
            placeholder="e.g. 1 year 3 month"
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Image URLs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Product Image URL
            </label>
            <input
              type="url"
              name="productImage"
              placeholder="https://..."
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Seller Image URL
            </label>
            <input
              type="url"
              placeholder="https://..."
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Seller Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Seller Name
            </label>
            <input
              type="text"
              placeholder="e.g. Artisan Roasters"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Seller Email
            </label>
            <input
              type="email"
              placeholder="e.g. leil31955@nlrord.com"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Seller Contact + Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Seller Contact
            </label>
            <input
              type="text"
              placeholder="e.g. +1-555-1234"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              placeholder="City, Country"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Simple Description about your Product
          </label>
          <textarea
            rows="3"
            placeholder="e.g. I bought this product 3 months ago. Did not use more than 1/2 time..."
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all text-sm sm:text-base"
        >
          Create A Product
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
