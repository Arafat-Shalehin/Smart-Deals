import React from "react";
import Navbar from "../component/Header/Navbar";
import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../component/Footer/Footer";
import Loader from "../component/Loader/Loader";

const RootLayout = () => {
  const navigation = useNavigation();
  return (
    <div>
      <Navbar></Navbar>
      <main className="min-h-screen">
        {navigation.state === "loading" ? <Loader /> : <Outlet></Outlet>}
      </main>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
