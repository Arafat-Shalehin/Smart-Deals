import React, { useState } from "react";
import { ArrowLeft, MapPin, Mail, X } from "lucide-react";
import tabImg from "../../assets/thumbnail-card.png";
import profilePic from "../../assets/thumb-profile.png";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLoaderData } from "react-router-dom";

const ProductDetails = () => {

    const product = useLoaderData();
    console.log(product);

  const [showOfferModal, setShowOfferModal] = useState(false);
  const [formData, setFormData] = useState({
    buyerName: "",
    buyerEmail: "",
    imageUrl: "",
    price: "",
    comment: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
    setShowOfferModal(false);
  };

  return (
    <div className="bg-[#eaeaea]">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:p-15 p-5">
        <div className="md:w-[50%]">
          <div className="">
            <img className="w-full" src={tabImg} alt={tabImg} />
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
                Condition: <span className="text-primary">New</span>
              </p>
              <p className="text-secondary font-semibold">
                Usage Time: <span className="text-primary">3 Month</span>
              </p>
            </div>
            <hr className="border-[#444444] my-3" />
            <p className="text-[#969A9D] font-semibold">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
          </div>
        </div>

        <div className="md:w-[50%] w-full md:space-y-5 space-y-3">
          <Link to="/" className="flex items-center">
            <ArrowLeft /> Back to Products
          </Link>

          <h1 className="font-bold lg:text-5xl md:text-3xl text-2xl">
            Yamaha Fz Guitar For Sale
          </h1>

          <span
            className="bg-[#632EE330] text-accent 
          rounded-2xl text-sm px-2"
          >
            Art and Hobbies
          </span>

          <div
            className="bg-[#FFFFFF] border border-gray-300 
          rounded p-2 mt-4 py-5 px-4"
          >
            <p className="text-[#4CAF50] lg:text-2xl font-bold">$22.5 - 30</p>
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
              <span className="text-primary">Product ID:</span>{" "}
              68f753ae2174ca368ec882f4
            </p>
            <p className="text-[#444444]">
              <span className="text-primary">Posted:</span> 10/19/2024
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
              <img src={profilePic} alt="Seller Image" />
              <div className="font-semibold text-[#444444]">
                <p>Sara Chen</p>
                <p>crafts.by.sara@shop.net</p>
              </div>
            </div>
            <p className="text-primary font-semibold">
              Location: <span className="text-[#444444]">Los Angeles, CA</span>
            </p>
            <p className="text-primary font-semibold">
              Contact: <span className="text-[#444444]">sara.chen_contact</span>
            </p>
            <p
              className="font-semibold text-primary flex items-center
            gap-2 mt-3"
            >
              Status:
              <span className="bg-[#FFC107] rounded-2xl px-3">on Sale</span>
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
                    name="buyerName"
                    value={formData.buyerName}
                    onChange={handleInputChange}
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
                    name="buyerEmail"
                    value={formData.buyerEmail}
                    onChange={handleInputChange}
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
                  value={formData.imageUrl}
                  onChange={handleInputChange}
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
                  value={formData.price}
                  onChange={handleInputChange}
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
                  value={formData.comment}
                  onChange={handleInputChange}
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
