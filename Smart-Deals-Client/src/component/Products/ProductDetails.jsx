import React, { useContext, useEffect, useState } from "react";
import { ArrowLeft, MapPin, Mail, X } from "lucide-react";
import tabImg from "../../assets/thumbnail-card.png";
import profilePic from "../../assets/thumb-profile.png";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const ProductDetails = () => {
  const product = useLoaderData();
  // console.log(product);

  const { user } = useContext(AuthContext);

  const [bids, setBids] = useState([]);

  const {
    image,
    condition,
    usage,
    description,
    title,
    category,
    price_min,
    price_max,
    _id,
    created_at,
    seller_image,
    seller_name,
    email,
    location,
    seller_contact,
    status,
  } = product;

  // useEffect(() => {
  //   fetch(`http://localhost:3000/products/bids/${_id}`, {
  //     headers: {
  //       authorization: `Bearer ${user.accessToken}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Bids for this product", data);
  //       setBids(data);
  //     });
  // }, [_id, user]);
  useEffect(() => {
    // fetch(`http://localhost:3000/products/bids/${_id}`, {
    //   headers: {
    //     authorization: `Bearer ${user.accessToken}`
    //   }
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("Bids for this product", data);
    //     setBids(data);
    //   });

    axios.get(`http://localhost:3000/products/bids/${_id}`)
    .then(data => {
      setBids(data.data);
    })
  }, [_id]);

  const [showOfferModal, setShowOfferModal] = useState(false);

  // <div>
  //   {/* // const [formData, setFormData] = useState({
  // //   buyerName: "",
  // //   buyerEmail: "",
  // //   imageUrl: "",
  // //   bidPrice: "",
  // //   comment: "",
  // // });

  // // const handleInputChange = (e) => {
  //   // setFormData({
  //   //   ...formData,
  //   //   [e.target.name]: e.target.value,
  //   // });
  // //   console.log(e);
  // // }; */}
  // </div>

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);
    // Handle form submission here

    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.price.value;

    console.log({ _id, name, email, bid });

    const newBid = {
      product: _id,
      productImage: image,
      productName: title,
      productPrice: price_min,
      sellerImage: seller_image,
      sellerName: seller_name,
      sellerContact: seller_contact,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: bid,
      status: "pending",
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setShowOfferModal(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your bid has been placed.",
            showConfirmButton: false,
            timer: 1500,
          });
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(newBids);
        }
      });
  };

  return (
    <div className="bg-[#eaeaea]">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:p-15 p-5">
        <div className="md:w-[50%]">
          <div className="">
            <img className="w-full" src={tabImg} alt="Product Image" />
          </div>
          <div
            className="bg-[#FFFFFF] border border-gray-300 
          rounded mt-10 p-2"
          >
            <p className="text-primary text-2xl font-bold my-5">
              Product Description
            </p>
            <div className="flex items-center justify-between">
              <p className="text-secondary font-semibold">
                Condition: <span className="text-primary">{condition}</span>
              </p>
              <p className="text-secondary font-semibold">
                Usage Time: <span className="text-primary">{usage}</span>
              </p>
            </div>
            <hr className="border-[#444444] my-3" />
            <p className="text-[#969A9D] font-semibold">{description}</p>
          </div>
        </div>

        <div className="md:w-[50%] w-full md:space-y-5 space-y-3">
          <Link to="/" className="flex items-center">
            <ArrowLeft /> Back to Products
          </Link>

          <h1 className="font-bold lg:text-5xl md:text-3xl text-2xl">
            {title}
          </h1>

          <span
            className="bg-[#632EE330] text-accent 
          rounded-2xl text-sm px-2"
          >
            {category}
          </span>

          <div
            className="bg-[#FFFFFF] border border-gray-300 
          rounded p-2 mt-4 py-5 px-4"
          >
            <p className="text-[#4CAF50] lg:text-2xl font-bold">
              ${price_min} - {price_max}
            </p>
            <p className="text-primary font-semibold">Price starts from </p>
          </div>

          <div
            className="bg-[#FFFFFF] border border-gray-300 
          rounded p-3 py-6 px-4"
          >
            <p className="text-xl lg:text-2xl font-semibold mb-3">
              Product Details
            </p>
            <p className="text-[#444444]">
              <span className="text-primary">Product ID: </span>
              {_id}
            </p>
            <p className="text-[#444444]">
              <span className="text-primary">Posted:</span> {created_at}
            </p>
          </div>

          <div
            className="bg-[#FFFFFF] border border-gray-300 
          rounded p-2 py-6 px-4"
          >
            <h1 className="text-xl lg:text-2xl font-semibold">
              Seller Information
            </h1>
            <div className="flex items-center gap-3 my-5">
              <img
                className="w-10 rounded-full"
                src={seller_image}
                alt="Seller Image"
              />
              <div className="font-semibold text-[#444444]">
                <p>{seller_name}</p>
                <p>{email}</p>
              </div>
            </div>
            <p className="text-primary font-semibold">
              Location: <span className="text-[#444444]">{location}</span>
            </p>
            <p className="text-primary font-semibold">
              Contact: <span className="text-[#444444]">{seller_contact}</span>
            </p>
            <p
              className="font-semibold text-primary flex items-center
            gap-2 mt-3"
            >
              Status:
              <span className="bg-[#FFC107] rounded-2xl px-3">{status}</span>
            </p>
          </div>
          {/* Buy Button */}
          <button
            onClick={() => setShowOfferModal(true)}
            className="w-full bg-linear-to-r from-accent to-secondary text-white py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            I Want Buy This Product
          </button>
        </div>
      </div>
      {/* Bid for product */}
      <div className="md:p-15 p-5">
        <h1 className="text-4xl font-bold">
          Bids For This Products:{" "}
          <span className="text-accent">({bids.length})</span>
        </h1>
        {bids.length > 0 && (
          <div className="w-full mx-auto my-10 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-50 border-b border-[#E9E9E9]">
                <tr>
                  <th className="py-3 px-4 font-medium">SL No</th>
                  <th className="py-3 px-4 font-medium">Product</th>
                  <th className="py-3 px-4 font-medium">Seller</th>
                  <th className="py-3 px-4 font-medium">Bid Price</th>
                  <th className="py-3 px-4 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#E9E9E9] hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{index + 1}</td>

                    {/* Product Info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={image}
                          alt="Product Image"
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{title}</p>
                          <p className="text-sm text-gray-500">
                            ${price_min} - {price_max}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Seller Info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={seller_image}
                          alt="Seller Image"
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {seller_name}
                          </p>
                          <p className="text-xs text-gray-500">{email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Bid Price */}
                    <td className="py-3 px-4 font-semibold">
                      ${bid.bid_price}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-center">
                      <button className="px-3 py-1.5 rounded-md text-sm font-medium border border-green-500 text-green-600 hover:bg-green-50 transition">
                        Accept Offer
                      </button>
                      <button className="ml-2 px-3 py-1.5 rounded-md text-sm font-medium border border-red-400 text-red-500 hover:bg-red-50 transition">
                        Reject Offer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {showOfferModal && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-lg max-w-md w-full p-8 relative"
          >
            <button
              onClick={() => setShowOfferModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Give Seller Your Offered Price
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Buyer Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user?.displayName}
                    placeholder="Your name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Buyer Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={user?.email}
                    placeholder="Your Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Buyer Image URL
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  defaultValue={user?.photoURL}
                  placeholder="https:// your_img_url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Place your Price
                </label>
                <input
                  type="text"
                  name="price"
                  placeholder="e.g. At least thousand"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comment box
                </label>
                <textarea
                  name="comment"
                  placeholder="e.g. +1-543-1234"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowOfferModal(false)}
                  className="flex-1 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Submit Bid
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductDetails;
