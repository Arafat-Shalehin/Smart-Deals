import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result);

        if (!result.user) return;

        const newUser = {
          name: result.user.displayName,
          photo: result.user.photoURL,
          email: result.user.email,
        };

        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Data after received", data);
          });
      })
      .catch((error) => {
        if (error.code === "auth/popup-closed-by-user") {
          console.warn("User closed the popup before signing in.");
        } else {
          console.error("Google Sign-In Error:", error);
        }
      });
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left"></div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <div className="text-center space-y-5">
                <h1 className="text-5xl font-bold">Register now!</h1>
                <p className="font-semibold">
                  Already have an accout?
                  <a className="ml-2 text-purple-600" href="/login">
                    Login Now
                  </a>
                </p>
              </div>
              <fieldset className="fieldset mt-3">
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input mb-2"
                  placeholder="Enter your name"
                />
                <label className="label">Image-URL</label>
                <input
                  type="text"
                  className="input mb-2"
                  placeholder="Give your image URL"
                />
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input mb-2"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <button
                  className="btn bg-linear-to-r from-[#632EE3] 
                to-[#9F62F2] mt-4 text-white"
                >
                  Register
                </button>
              </fieldset>
              <div className="divider">OR</div>
              <button
                onClick={handleGoogleSignIn}
                className="btn border-gray-300 px-8 py-6 
              rounded-md flex justify-center items-center
              gap-2 font-semibold"
              >
                <FcGoogle size={30} /> Sign Up With Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
