import React from 'react';
import { FiShoppingCart, FiEye } from 'react-icons/fi';
import {useNavigate, useLocation} from 'react-router-dom' 

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { name, image, price, discount, stock, unit } = product;
  
  // Calculate discount
  const discountedPrice = discount ? price - (price * (discount / 100)) : price;

  const handlePreview = () => {
  // Pass data through state
  navigate(`/product/${product._id}`, { state: { product } });
};

  return (
    <div onClick={handlePreview} className="group bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={image[0] || ''} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
           <button className="p-3 bg-white rounded-full text-gray-900 hover:bg-[rgb(var(--primary))] hover:text-white transition-colors">
              <FiShoppingCart size={18} />
           </button>
           <button onClick={handlePreview} className="p-3 bg-white rounded-full text-gray-900 hover:bg-[rgb(var(--primary))] hover:text-white transition-colors">
              <FiEye size={18} />
           </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-[rgb(var(--text-primary))] truncate mb-1">
          {name}
        </h3>
        <p className="text-xs text-[rgb(var(--text-secondary))] mb-2">{unit}</p>
        
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[rgb(var(--primary))]">
            ${discountedPrice.toFixed(2)}
          </span>
          {discount > 0 && (
            <span className="text-xs text-gray-400 line-through">
              ${price.toFixed(2)}
            </span>
          )}
        </div>

        {stock < 10 && stock > 0 && (
          <p className="mt-2 text-[10px] text-orange-600 font-semibold">
            Only {stock} left in stock!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;