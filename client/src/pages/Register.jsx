import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiCheckCircle } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import axios from "../config/axios.config";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const registerHandler = async (data) => {
    console.log(data);
    {
      /* Basic client-side validation */
    }
    {
      // data.password.length < 8 &&
      //   setError("password", {
      //     type: "manual",
      //     message: "Password must be at least 8 characters long",
      //   });

      data.name === "" &&
        setError("name", {
          type: "manual",
          message: "Name is required",
        });

      data.email === "" &&
        setError("email", {
          type: "manual",
          message: "Email is required",
        });
    }
    if (errors.password || errors.name || errors.email) return;

    try {
      const response = await axios.post("/user/register", data);
      console.log(response);
      if (response.data.success) {
        reset();
        navigate("/login");
        toast.success("Registration successful! You can now log in.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <div className="w-full h-screen bg-[rgb(var(--background))] flex items-center justify-center p-6 pt-20 ">
      <div className="max-w-5xl w-full bg-[rgb(var(--surface))] rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row-reverse border border-[rgb(var(--border))]">
        {/* Form Side */}
        <div className="md:w-1/2 p-6 md:p-12">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))]">
              Create Account
            </h1>
            <p className="text-[rgb(var(--text-secondary))] text-sm mt-2">
              Join the ShopMate community today.
            </p>
          </div>

          <form onSubmit={handleSubmit(registerHandler)} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[rgb(var(--text-secondary))] mb-2">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" />
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))/0.2] focus:border-[rgb(var(--primary))] transition-all"
                  {...register("name", {
                    required: true,
                    message: "Name is required",
                  })}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[rgb(var(--text-secondary))] mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" />
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))/0.2] focus:border-[rgb(var(--primary))] transition-all"
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[rgb(var(--text-secondary))] mb-2">
                Password
              </label>

              <div className="relative ">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className="w-full bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))/0.2] focus:border-[rgb(var(--primary))] transition-all"
                  {...register("password", { required: true })}
                />
                <div
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-[rgb(var(--text-secondary))]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaRegEyeSlash size={16} />
                  ) : (
                    <FaRegEye size={16} />
                  )}
                </div>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  required={true}
                  className="w-4 h-4 accent-[rgb(var(--primary))]"
                />
                <span className="text-xs text-[rgb(var(--text-secondary))] group-hover:text-[rgb(var(--text-primary))] transition-colors">
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </label>
            </div>

            <button className="w-full bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-hover))] text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-[rgb(var(--primary))/0.2]">
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[rgb(var(--text-secondary))]">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-[rgb(var(--primary))] font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
        {/* Side Banner */}
        <div className="md:w-1/2 bg-[rgb(var(--primary))] p-12 hidden md:flex flex-col  text-white">
          <img src={logo} alt="" className="w-30 h-30" />

          <h2 className="text-4xl font-bold mb-6 italic">
            Start your journey.
          </h2>
          <p className="text-white/80 mb-8">
            Create an account to save your preferences and enjoy a faster
            checkout experience.
          </p>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-2 items-center opacity-90">
              <FiCheckCircle /> Personalized Recommendations
            </li>
            <li className="flex gap-2 items-center opacity-90">
              <FiCheckCircle /> 1-Click Checkout
            </li>
            <li className="flex gap-2 items-center opacity-90">
              <FiCheckCircle /> Rewards Program
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;
