import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FiLock, FiEye, FiEyeOff, FiCheckCircle, FiChevronLeft } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "../config/axios.config";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp } = location.state || {}; // Safety check for state
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  // Watch the password field to compare with confirm password
  const password = watch("password", "");

  const resetHandler = async (data) => {
    try {
      const response = await axios.post("/user/reset-password", {
        email,
        otp,
        newPassword: data.password,
      });

      if (response.data.success) {
        toast.success("Password reset successful!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  // Redirect if accessed directly without email/otp state
  if (!email || !otp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--background))] p-6">
        <div className="text-center">
          <p className="text-[rgb(var(--text-secondary))] mb-4">Invalid session. Please start over.</p>
          <Link to="/forgot-password" size="sm" className="text-[rgb(var(--primary))] font-bold hover:underline">
            Go to Forgot Password
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[rgb(var(--background))] md:pt-20">
      <div className="max-w-5xl w-full bg-[rgb(var(--surface))] rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-[rgb(var(--border))]">
        
        {/* Left Side: Aesthetic/Branding */}
        <div className="md:w-1/2 bg-[rgb(var(--accent-soft))] p-8 md:p-12 hidden md:flex flex-col justify-center text-[rgb(var(--text-primary))]">
          <div className="w-14 h-14 mb-6 rounded-2xl bg-[rgb(var(--primary))] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            <FiLock />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            Create New <br />
            <span className="text-[rgb(var(--primary))]">Credentials.</span>
          </h2>
          <p className="text-[rgb(var(--text-secondary))] mb-8 leading-relaxed">
            Your identity has been verified. Choose a strong password to 
            keep your ShopMate account secure and protected.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm font-medium">
              <FiCheckCircle className="text-[rgb(var(--primary))]" />
              <span>Minimum 8 characters</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium">
              <FiCheckCircle className="text-[rgb(var(--primary))]" />
              <span>Mix of letters and numbers</span>
            </div>
          </div>
        </div>

        {/* Right Side: Reset Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <Link
              to="/verify-otp"
              className="inline-flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[rgb(var(--primary))] hover:underline mb-4"
            >
              <FiChevronLeft className="mr-1" /> Back
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold text-[rgb(var(--text-primary))]">
              New Password
            </h1>
            <p className="text-[rgb(var(--text-secondary))] text-xs sm:text-sm mt-2">
              Set a strong password for <span className="text-[rgb(var(--text-primary))] font-medium">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit(resetHandler)} className="space-y-5">
            {/* New Password Field */}
            <div>
              <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[rgb(var(--text-secondary))] mb-2">
                New Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))/0.2] focus:border-[rgb(var(--primary))] transition-all text-[rgb(var(--text-primary))]"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--primary))]"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{errors.password.message}</p>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[rgb(var(--text-secondary))] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))/0.2] focus:border-[rgb(var(--primary))] transition-all text-[rgb(var(--text-primary))]"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) => val === password || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--primary))]"
                >
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-hover))] text-white font-semibold py-3 sm:py-4 rounded-lg flex items-center justify-center gap-2 transition-all group shadow-lg shadow-[rgb(var(--primary))/0.2] ${
                isSubmitting ? "opacity-70 cursor-wait" : ""
              }`}
            >
              {isSubmitting ? "Updating..." : "Update Password"}
              {!isSubmitting && <FiCheckCircle className="group-hover:scale-110 transition-transform" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;