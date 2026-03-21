import { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiArrowRight, FiShield, FiChevronLeft } from "react-icons/fi";
import api from '../config/axios.config'

const OTPVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const navigate = useNavigate();
  const location = useLocation();
  const inputsRef = useRef([]);
  const email = location.state?.email

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("").map((char) => char);
    const filledOtp = [...newOtp, ...Array(6 - newOtp.length).fill("")];
    setOtp(filledOtp);

    const targetIndex = Math.min(newOtp.length, 5);
    inputsRef.current[targetIndex]?.focus();
  };

  const handleSubmit = async() => {
    const finalOtp = otp.join("");
    console.log("OTP:", finalOtp);
    try {
        const response = await api.post('/user/verify-otp',{email: email,otp: finalOtp});
        console.log(response.data);
        if(response.data.success){
          navigate('/reset-password',{state: {email : email, otp: finalOtp}});
        }
    } catch (error) {
        console.log(error);
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[rgb(var(--background))] md:pt-20">
      <div className="max-w-5xl w-full bg-[rgb(var(--surface))] rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-[rgb(var(--border))]">
        
        {/* Left Side: Hidden on Mobile, Flex on Desktop */}
        <div className="md:w-1/2 bg-[rgb(var(--accent-soft))] p-8 md:p-12 hidden md:flex flex-col justify-center text-[rgb(var(--text-primary))]">
          <div className="w-14 h-14 mb-6 rounded-2xl bg-[rgb(var(--primary))] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            <FiShield />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            Security <br />
            <span className="text-[rgb(var(--primary))]">Verification.</span>
          </h2>
          <p className="text-[rgb(var(--text-secondary))] mb-8 leading-relaxed">
            We've sent a 6-digit code to your email. This ensures that only you can access your account.
          </p>
          <div className="flex items-center gap-3 text-sm font-medium">
            <div className="w-5 h-5 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center text-white text-[10px]">
              ✓
            </div>
            <span>Two-Factor Authentication</span>
          </div>
        </div>

        {/* Right Side: Form Area (Full width on Mobile) */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <Link
              to="/forgot-password"
              className="inline-flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[rgb(var(--primary))] hover:underline mb-4"
            >
              <FiChevronLeft className="mr-1" /> Back
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold text-[rgb(var(--text-primary))]">
              Verify OTP
            </h1>
            <p className="text-[rgb(var(--text-secondary))] text-xs sm:text-sm mt-2">
              Enter the 6-digit code sent to your inbox
            </p>
          </div>

          <div className="space-y-8 flex flex-col">
            {/* OTP Inputs Group - Responsive Flexbox */}
            <div
              className="flex justify-between items-center gap-1 sm:gap-2 md:gap-3"
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric" /* Better for mobile keyboard */
                  pattern="[0-9]*"
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="flex-1 min-w-0 h-11 sm:h-14 md:h-16 text-center text-lg sm:text-xl font-bold rounded-lg sm:rounded-xl 
                  border border-[rgb(var(--border))] 
                  bg-[rgb(var(--muted))] 
                  text-[rgb(var(--text-primary))] 
                  focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))/0.3] 
                  focus:border-[rgb(var(--primary))] transition-all shadow-sm"
                />
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isOtpComplete}
              className={`w-full py-3 sm:py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all group
                ${
                  isOtpComplete
                    ? "bg-[rgb(var(--primary))] text-white hover:bg-[rgb(var(--primary-hover))] shadow-lg shadow-[rgb(var(--primary))/0.2]"
                    : "bg-[rgb(var(--muted))] text-[rgb(var(--text-secondary))] cursor-not-allowed border border-[rgb(var(--border))]"
                }`}
            >
              Verify Code
              <FiArrowRight
                className={`${isOtpComplete ? "group-hover:translate-x-1" : ""} transition-transform`}
              />
            </button>

            <div className="text-center">
              <p className="text-xs sm:text-sm text-[rgb(var(--text-secondary))]">
                Didn't receive the code?{" "}
                <button className="text-[rgb(var(--primary))] font-bold hover:underline">
                  Resend OTP
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;