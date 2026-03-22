import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {loadUser, logoutUser} from '../store/reducres/userSlice'
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";
import { 
  FiUser, FiPackage, FiHeart, FiMapPin, 
  FiCreditCard, FiSettings, FiLogOut, FiChevronRight 
} from "react-icons/fi";

import PseudoNav from "../components/PseudoNav";

const Account = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const menuItems = [
    { id: "profile", label: "Profile Info", icon: <FiUser />, path: "/profile" },
    { id: "orders", label: "My Orders", icon: <FiPackage />, path: "/orders" },
    { id: "wishlist", label: "Wishlist", icon: <FiHeart />, path: "/wishlist" },
    { id: "addresses", label: "Addresses", icon: <FiMapPin />, path: "/addresses" },
    { id: "payments", label: "Payments", icon: <FiCreditCard />, path: "/payments" },
    { id: "settings", label: "Settings", icon: <FiSettings />, path: "/settings" },
  ];
  const handleLogout = ()=> {
    dispatch(logoutUser());
    toast.success("Logout successfully!")
    navigate('/');

  }

  return (
    <div className="min-h-screen bg-[rgb(var(--muted))] py-8 px-4 sm:px-6 lg:px-8">
      <PseudoNav pageTitle="Acc" />
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[rgb(var(--text-primary))]">My Account</h1>
          <p className="text-[rgb(var(--text-secondary))] mt-2">Manage your profile, orders, and preferences.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* 1. Sidebar Navigation */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-[rgb(var(--surface))] rounded-2xl border border-[rgb(var(--border))] overflow-hidden shadow-sm">
              <nav className="flex flex-col p-2">
                {menuItems.map((item) => (
                  <Link
                  to={item.path}
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-[rgb(var(--primary))] text-white shadow-md shadow-[rgb(var(--primary)/0.2)]"
                        : "text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--primary))]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      {item.label}
                    </div>
                    <FiChevronRight className={`transition-transform ${activeTab === item.id ? "rotate-90" : ""}`} />
                  </Link>
                ))}
                
                <hr className="my-2 border-[rgb(var(--border))]" />
                
                <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-[rgb(var(--danger))] hover:bg-red-50 rounded-xl transition-colors">
                  <FiLogOut size={18} /> Logout
                </button>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Account;