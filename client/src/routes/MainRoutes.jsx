import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/Products";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Account from "../pages/Account";
import UserProfile from "../pages/UserProfile";
import Wishlist from "../pages/Wishlist";
import Orders from "../pages/Orders";
import Addresses from "../pages/Addresses";
import Payments from "../pages/Payments";
import Settings from "../pages/Settings";
import ForgotPass from "../pages/ForgotPass";
import OTPVerification from "../pages/OtpVerification";
import ResetPassword from "../components/ResetPassword";
import ProductPreview from "../components/ProductPreview";
import Support from "../pages/Support";

import AdminRoute from "../components/AdminRoutes";
import AdminDashboard from "../pages/AdminDashboard";
import ManageCategories from "../components/ManageCategories";
import ManageSubCategories from "../components/ManageSubCategories";
import ManageProducts from "../components/ManageProducts";
import AddProduct from "../components/AddProduct";

const MainRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductPreview />} />
      
      <Route path="/support" element={<Support />} />

      {/* Auth */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route path="/verify-otp" element={<OTPVerification />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ✅ Account (Nested Dashboard) */}
      <Route path="/account" element={<Account />}>
        <Route index element={<UserProfile />} /> {/* default */}
        <Route path="profile" element={<UserProfile />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<Orders />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="addresses" element={<Addresses />} />
        <Route path="payments" element={<Payments />} />
        <Route path="settings" element={<Settings />} />

        {/* future routes */}
        {/* <Route path="addresses" element={<Addresses />} /> */}
        {/* <Route path="payments" element={<Payments />} /> */}
      </Route>

      {/* ✅ Admin Panel */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="dashboard" element={<AdminDashboard />}>
          <Route index element={<ManageProducts />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="sub-categories" element={<ManageSubCategories />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="add-product" element={<AddProduct />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default MainRoutes;