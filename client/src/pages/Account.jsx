import React from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/reducres/userSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import {
  FiUser,
  FiPackage,
  FiHeart,
  FiShoppingCart,
  FiMapPin,
  FiCreditCard,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import PseudoNav from "../components/PseudoNav";

const menuItems = [
  { label: "Profile", icon: FiUser, path: "profile" },
  { label: "Cart", icon: FiShoppingCart, path: "cart" },
  { label: "Orders", icon: FiPackage, path: "orders" },
  { label: "Wishlist", icon: FiHeart, path: "wishlist" },
  { label: "Address", icon: FiMapPin, path: "addresses" },
  { label: "Payments", icon: FiCreditCard, path: "payments" },
  { label: "Settings", icon: FiSettings, path: "settings" },
];

const Account = () => {
  const user = useSelector((state) => state.userReducer?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logout successfully!");
    navigate("/");
  };

  const name = user?.name
    ?.split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[rgb(var(--muted))]">
      
      {/* Top Navbar */}
      <PseudoNav pageTitle="Account" />

      {/* Content Wrapper */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-8 h-full flex flex-col">
          
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[rgb(var(--text-primary))]">
              {name}
            </h1>
            <p className="text-sm sm:text-base text-[rgb(var(--text-secondary))] mt-1 sm:mt-2">
              Manage your profile, orders, and preferences.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 flex-1 overflow-hidden min-h-0">

            {/* 📱 Mobile Tabs */}
            <div className="lg:hidden col-span-1 overflow-x-auto">
              <div className="flex gap-2 pb-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={index}
                      to={item.path}
                      className={({ isActive }) =>
                        `relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm whitespace-nowrap ${
                          isActive
                            ? "text-white"
                            : "text-[rgb(var(--text-secondary))] bg-[rgb(var(--surface))]"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <motion.div
                              layoutId="activeTabMobile"
                              className="absolute inset-0 bg-[rgb(var(--primary))] rounded-xl"
                            />
                          )}
                          <div className="relative flex items-center gap-2 z-10">
                            <Icon size={16} />
                            {item.label}
                          </div>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {/* 🖥 Sidebar */}
            <aside className="hidden lg:block lg:col-span-1 h-full">
              <div className=" bg-[rgb(var(--surface))] rounded-2xl border border-[rgb(var(--border))] p-2 shadow-sm">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={index}
                      to={item.path}
                      className={({ isActive }) =>
                        `relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                          isActive
                            ? "text-white"
                            : "text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--muted))]"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute inset-0 bg-[rgb(var(--primary))] rounded-xl"
                            />
                          )}
                          <div className="relative flex items-center gap-3 z-10">
                            <Icon size={18} />
                            {item.label}
                          </div>
                        </>
                      )}
                    </NavLink>
                  );
                })}

                <hr className="my-3 border-[rgb(var(--border))]" />

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[rgb(var(--danger))] hover:bg-red-50 rounded-xl transition"
                >
                  <FiLogOut size={18} />
                  Logout
                </button>
              </div>
            </aside>

            {/* 📄 Main Content (SCROLLABLE) */}
            <main className="col-span-1 lg:col-span-3 h-full min-h-0 ">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-[rgb(var(--surface))] rounded-2xl border border-[rgb(var(--border))]   shadow-sm h-full overflow-x-hidden overflow-y-auto scroll-smooth no-scrollbar "
              >
                <Outlet />
              </motion.div>
            </main>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;