import React from "react";
import LatestProducts from "../Products/LatestProducts";
import Hero from "../Hero/Hero";

const latestProductsPromise = fetch(
  "http://localhost:3000/latest-products"
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
    </div>
  );
};

export default Home;
