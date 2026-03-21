import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiArrowRight, FiChevronLeft } from "react-icons/fi";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-toastify";
import axios from "../config/axios.config";
import logo from "../assets/logo.png";


const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/forgot-password", { email: formData.email });
      toast.success("OTP sent to your email!");
      setStep(2);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    }
  };

  useEffect(() => {
    if (step === 2) {
      navigate("/verify-otp", { state: { email: formData.email } });
    }
  }, [step, navigate, formData.email]);

  return (
    <div className="w-screen h-screen flex items-center justify-center p-6 bg-[rgb(var(--background))] pt-20">
      <div className="max-w-5xl w-full bg-[rgb(var(--surface))] rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-[rgb(var(--border))]">
        
        {/* Left Side: Aesthetic/Branding (Matches Login) */}
        <div className="md:w-1/2 bg-[rgb(var(--accent-soft))] p-12 hidden md:flex flex-col justify-center text-[rgb(var(--text-primary))]">
            <img src={logo} alt="" className="w-30 h-30"/>
          
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Forgot your <br />
            <span className="text-[rgb(var(--primary))]">Password?</span>
          </h2>
          <p className="text-[rgb(var(--text-secondary))] mb-8 leading-relaxed">
            Don't worry! It happens to the best of us. Enter your email and 
            we'll help you get back to your ShopMate account in no time.
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-[rgb(var(--text-secondary))]">
            <RiLockPasswordFill className="text-[rgb(var(--primary))] text-lg" />
            <span>Secure SSL Encrypted Reset</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="mb-10">
            <Link 
              to="/login" 
              className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[rgb(var(--primary))] hover:underline mb-4"
            >
              <FiChevronLeft className="mr-1" /> Back to Login
            </Link>
            <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))]">
              Reset Password
            </h1>
            <p className="text-[rgb(var(--text-secondary))] text-sm mt-2">
              Enter your registered email to receive an OTP
            </p>
          </div>

          <form onSubmit={sendOtp} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[rgb(var(--text-secondary))] mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="w-full bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))/0.2] focus:border-[rgb(var(--primary))] transition-all text-[rgb(var(--text-primary))]"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-hover))] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors group"
            >
              Send OTP 
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[rgb(var(--text-secondary))]">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="text-[rgb(var(--primary))] font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;