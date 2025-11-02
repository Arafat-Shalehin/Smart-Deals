import { Search } from "lucide-react";
import bgLeftImg from "../../assets/bg-hero-left.png";
import bgRightImg from "../../assets/bg-hero-right.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-24 px-4 bg-gradient-to-br from-pink-100 via-white to-cyan-100 overflow-hidden">
      {/* Decorative curved lines (optional if you want the same style as your image) */}
      <div className="absolute flex items-center justify-between top-0 left-0 w-full h-full pointer-events-none">
        <img
          className="w-50 hidden md:block"
          src={bgLeftImg}
          alt="Background Image"
        />
        <img
          className="w-50 hidden md:block"
          src={bgRightImg}
          alt="Background Image"
        />
      </div>

      {/* Text */}
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-snug relative z-10">
        Deal Your <span className="text-purple-600">Products</span>
        <br />
        In A <span className="text-purple-600">Smart</span> Way !
      </h1>

      <p className="mt-4 text-[#627382] max-w-2xl relative z-10">
        SmartDeals helps you sell, resell, and shop from trusted local sellers —
        all in one place!
      </p>

      {/* Search Bar */}
      <div className="mt-8 flex w-full max-w-xl relative z-10">
        <input
          type="text"
          placeholder="search For Products, Categories..."
          className="flex-1 px-5 py-3 rounded-l-full border border-gray-200 shadow-sm focus:outline-none"
        />
        <button className="bg-purple-600 text-white p-3 rounded-r-full hover:bg-purple-700 transition">
          <Search size={20} />
        </button>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4 relative z-10">
        <Link to='/allproducts'>
          <button className="bg-linear-to-r from-accent to-secondary hover:scale-110 transition text-white px-6 py-3 rounded-lg shadow">
            Watch All Products
          </button>
        </Link>
        <button className="border border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg">
          Post an Product
        </button>
      </div>
    </section>
  );
};

export default Hero;
