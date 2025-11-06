import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyBids = () => {
  const { user } = useContext(AuthContext);

  const [bids, setBids] = useState([]);
  const axiosSecure = useAxiosSecure();

  // console.log('Token', user.accessToken);

  useEffect(() => {
    axiosSecure.get(`bids?email=${user?.email}`)
    .then(data => {
      setBids(data.data);
    })
  }, [user, axiosSecure])

  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`http://localhost:3000/bids?email=${user.email}`, {
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem('token')}`
  //       }
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setBids(data);
  //       });
  //   }
  // }, [user?.email]);

  const handleDeleteBid = (productId) => {
    console.log(productId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bids/${productId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Bid has been deleted.",
                icon: "success",
              });

              const remainingBid = bids.filter(bid => bid._id !== productId);
              setBids(remainingBid);
            }
          });
        }
    });
  };
  return (
    <div className="md:px-10">
      <h2 className="text-4xl font-bold my-13 text-center">
        My Bids: <span className="text-accent">{bids.length}</span>
      </h2>
      {bids.length > 0 && (
        <div className="w-full mx-auto my-10 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full md:px-15 text-left text-sm text-gray-700">
            <thead className="bg-gray-50 border-b border-[#E9E9E9]">
              <tr>
                <th className="py-3 px-4 font-medium">SL No</th>
                <th className="py-3 px-4 font-medium">Product</th>
                <th className="py-3 px-4 font-medium">Seller</th>
                <th className="py-3 px-4 font-medium">Bid Price</th>
                <th className="py-3 px-4 font-medium">Status</th>
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
                        src={bid.productImage}
                        alt="Product Image"
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {bid.productName}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${bid.productPrice}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Seller Info */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={bid.sellerImage}
                        alt="Seller Image"
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {bid.sellerName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {bid.sellerContact}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Bid Price */}
                  <td className="py-3 px-4 font-semibold">${bid.bid_price}</td>

                  {/* Status */}
                  <td className="py-3 px-4 font-semibold">${bid.status}</td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDeleteBid(bid._id)}
                      className="ml-2 px-3 py-1.5 rounded-md text-sm font-medium border border-red-400 text-red-500 hover:bg-red-50 transition"
                    >
                      Remove Bid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBids;
