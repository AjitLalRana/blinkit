import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiHelpCircle } from 'react-icons/fi';
import logo from '../assets/logo.png'; // Adjust path as needed
import { useSelector} from 'react-redux'

const PseudoNav = ({ pageTitle }) => {
  const user = useSelector((state)=> state.userReducer?.user);
  return (
    <nav className="w-full h-auto bg-[rgb(var(--surface))] border-b border-[rgb(var(--border))] sticky top-0 z-50 bg-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Section: Back or Logo */}
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 group text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--primary))] transition-colors"
          >
            <FiArrowLeft size={20} />
            <span className="hidden sm:inline text-sm font-medium">Back to Shop</span>
          </Link>
          
          <div className="h-6 w-[1px] bg-[rgb(var(--border))] hidden sm:block"></div>
          
          <Link to="/">
            <img
              src={logo}
              alt="ShopMate Logo"
              className="h-10 sm:h-20 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Center Section: Page Title (Optional) */}
        {pageTitle && (
          <h1 className="absolute left-1/2 -translate-x-1/2 font-semibold text-[rgb(var(--text-primary))] hidden md:block">
            {pageTitle}
          </h1>
        )}

        {/* Right Section: Support or Simple Links */}
        <div className="flex items-center gap-6">
          <Link 
            to="/support" 
            className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--primary))] flex items-center gap-1 text-sm"
          >
            <FiHelpCircle size={18} />
            <span className="hidden xs:inline">Help</span>
          </Link>
          
          {
            !user && (<Link 
            to="/login" 
            className="bg-[rgb(var(--primary))] text-[rgb(var(--surface))] px-4 py-1.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Sign In
          </Link>)
          }
        </div>
      </div>
    </nav>
  );
};

export default PseudoNav;