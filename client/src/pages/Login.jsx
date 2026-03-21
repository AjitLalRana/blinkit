import React from "react";
import { Link } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { useForm } from "react-hook-form";
import axios from "../config/axios.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const loginHandler = async (data) => {
    try {
      const response = await axios.post("/user/login", data);
      console.log(response.data.data);
      if (response.data.success) {
        reset();
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center p-6 bg-[rgb(var(--background))] pt-40">
      <div className=" max-w-5xl w-full bg-[rgb(var(--surface))] rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-[rgb(var(--border))]">
        {/* Left Side: Aesthetic/Branding */}
        <div className="md:w-1/2 bg-[rgb(var(--accent-soft))] p-12 hidden  md:flex flex-col justify-center text-[rgb(var(--text-primary))]">
          <img src={logo} alt="" className="w-30 h-30" />
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Welcome Back to{" "}
            <span className="text-[rgb(var(--primary))]">ShopMate.</span>
          </h2>
          <p className="text-[rgb(var(--text-secondary))] mb-8 leading-relaxed">
            Discover curated essentials for your home. Log in to access your
            wishlist, track orders, and explore new arrivals.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm font-medium">
              <div className="w-6 h-6 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center text-white text-xs">
                ✓
              </div>
              <span>Exclusive Member Discounts</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium">
              <div className="w-6 h-6 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center text-white text-xs">
                ✓
              </div>
              <span>Early Access to Sales</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))]">
              Sign In
            </h1>
            <p className="text-[rgb(var(--text-secondary))] text-sm mt-2">
              Enter your details to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(loginHandler)} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[rgb(var(--text-secondary))] mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))/0.2] focus:border-[rgb(var(--primary))] transition-all"
                  {...register("email", {
                    required: true,
                    message: "Email is required",
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--text-secondary))]">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-[rgb(var(--primary))] hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))/0.2] focus:border-[rgb(var(--primary))] transition-all"
                  {...register("password", {
                    required: true,
                    message: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <button className="w-full bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-hover))] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors group">
              Login{" "}
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[rgb(var(--text-secondary))]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[rgb(var(--primary))] font-bold hover:underline"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
