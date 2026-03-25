import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import PseudoNav from "./PseudoNav";
import Header from "./Header";
import Footer from "./Footer";
import SimilarProducts from "./SimilarProducts";

const ProductPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.userReducer?.user);

  // Mocking the data from your object
  const product = location?.state?.product;

  const [mainImage, setMainImage] = useState(product?.image[0]);

  // Calculate original price based on discount
  const originalPrice = product?.price;
  const discountedPrice = product?.discount
    ? originalPrice - originalPrice * (product?.discount / 100)
    : originalPrice;

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
    } else {
      console.log("added to cart");
    }
  };

  return (
    <div className=" bg-white text-gray-800">
      <Header />
      <div className="max-w-6xl mx-auto sm:mt-25  md:p-4 p-2 pt-45 sm:pt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Image Gallery */}
        <div className="p-4">
          <div className="aspect-square overflow-hidden  rounded-xl bg-gray-100 border border-gray-200">
            <img
              src={mainImage}
              alt={product?.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="p-4 flex gap-4 overflow-x-auto pb-2">
            {product?.image?.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImage(img)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-1 shadow-2xs transition-all ${
                  mainImage === img
                    ? "shadow-[rgb(var(--primary))] "
                    : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt="thumbnail"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <span className="text-sm font-bold text-[rgb(var(--primary))] uppercase tracking-widest">
              Living Room
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-2 capitalize">
              {product?.name}
            </h1>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {product?.description}
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-gray-900">
                ₹{discountedPrice.toLocaleString()}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-bold rounded">
                {product?.discount}% OFF
              </span>
            </div>
            <p className="text-gray-400 line-through text-lg">
              ₹{originalPrice?.toLocaleString()}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[rgb(var(--primary))] text-white px-8 py-4 rounded-xl font-bold hover:bg-[rgb(var(--primary-hover))] transition-colors shadow-lg shadow-indigo-200 active:scale-95 cursor-pointer"
            >
              Add to Cart
            </button>
            <button className="flex-1 bg-red-100 border-2 border-red-50 px-8 py-4 rounded-xl font-bold hover:bg-red-200/90 transition-colors active:scale-95 cursor-pointer">
              Wishlist
            </button>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <p
              className={`text-sm ${product?.stock > 0 ? "text-green-600" : "text-red-500"} font-medium`}
            >
              {product?.stock > 0 ? `In Stock` : "Out of Stock"}
            </p>
          </div>
        </div>
      </div>
      <hr />
      <SimilarProducts currentProduct={product} />
      <hr />
      <Footer />
    </div>
  );
};

export default ProductPreview;
