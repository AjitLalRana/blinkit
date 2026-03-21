import React, { use } from "react";
import { useState, useEffect } from "react";
import { useSelector} from "react-redux";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiMenu,
  FiPackage,
  FiHeart,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import logo from "../assets/logo.png";
import logoDark from "../assets/logoDark.png";
import SubCategory from "./SubCategory";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [isUser, setIsUser] = useState(false);
  const [cartItems, setCartItems] = useState(null);
  const [cartPrice, setCartPrice] = useState("$0.00");
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { user, isLoading } = useSelector((state) => state.userReducer);
  



  const handleLogout = () => {
    
  };

  
  

  // Common styles for the icon buttons
  const iconButtonClass =
    "p-2 rounded-full hover:bg-[rgb(var(--accent-soft))] text-[rgb(var(--text-primary))] transition-all duration-300 relative";

  return (
    <header className="fixed top-0 z-50 w-full bg-[rgb(var(--surface))/0.8] backdrop-blur-md border-b border-[rgb(var(--border))] transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-8">
        {/* 1. Logo Section */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="ShopMate Logo"
              className="h-20 sm:h-35 w-auto object-contain"
            />
          </Link>
        </div>

        {/* 2. Search Bar Section - Centered and Responsive */}
        <div className="hidden   md:flex flex-1 relative group">
          <input
            type="text"
            placeholder="Search for luxury essentials..."
            className="w-full bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-full py-2.5 pl-5 pr-12 text-sm text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))/0.2] focus:border-[rgb(var(--primary))] transition-all"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--primary))] transition-colors">
            <FiSearch size={16} />
          </button>
        </div>

        {/* Theme Toggle Button */}
        

        {/* 3. Actions: Login and Cart */}

        <div className="flex items-center gap-2 md:gap-4">
          {/* CART DROPDOWN */}
          <div className="relative group">
            <Link to="/cart" className={`${iconButtonClass} flex items-center`}>
              <FiShoppingCart size={22} />
              <span className="absolute -top-1 -right-1 bg-[rgb(var(--primary))] text-[rgb(var(--surface))] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            </Link>

            {/* Mini Cart Preview */}
            
          </div>

          {/* ACCOUNT DROPDOWN */}
          <div className="relative group">
            { !user ? (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[rgb(var(--text-primary))] hover:text-[rgb(var(--primary))] transition-colors"
              >
                <FiUser size={20} />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            ) : (
              <Link to="/account" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[rgb(var(--text-primary))] cursor-pointer group-hover:text-[rgb(var(--primary))] transition-colors">
                <FiUser size={20} />
                <span className="hidden sm:inline">Account</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* 2. Search Bar Section - Centered and Responsive */}
      <div className="md:hidden flex flex-1 relative group px-4 sm:px-6 lg:px-8 mb-4">
        <input
          type="text"
          placeholder="Search for luxury essentials..."
          className="w-full bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-full py-2.5 pl-5 pr-12 text-sm text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))/0.2] focus:border-[rgb(var(--primary))] transition-all"
        />
        <button className="absolute right-4 top-1/2 px-4 -translate-y-1/2 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--primary))] transition-colors">
          <FiSearch size={16} />
        </button>
      </div>

      {/* Optional: Secondary Nav (Categories) */}
      <SubCategory />
    </header>
  );
};

export default Header;
