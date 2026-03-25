import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiCamera,
  FiCheckCircle,
  FiLogOut,
} from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import api from "../config/axios.config";
import { toast } from "react-toastify";
import { loadUser,logoutUser } from "../store/reducres/userSlice";
import PseudoNav from "../components/PseudoNav";

const UserProfile = ({ u, onUpdate }) => {
  const user = useSelector((state) => state?.userReducer?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
  });
  console.log(user);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Logic to handle avatar upload to Cloudinary (calls your uploadAvatar controller)
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const response = await api.post("/user/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response?.data?.url) {
        toast.success("Avatar uploaded");
        dispatch(loadUser({ ...user, avatar: response.data.url }));
      }
    } catch (error) {
      toast.error("Failed to upload avatar");
      console.log(error);
    }
    setLoading(false);
  };

  const handleLogout = ()=> {
      dispatch(logoutUser());
      toast.success("Logout successfully!")
      navigate('/');
  
    }

  return (
    <>
    <PseudoNav/>
      <div className="max-w-4xl mx-auto my-5 p-4">
        <div className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-2xl overflow-hidden shadow-sm">
          {/* Header/Cover Section */}
          <div className="h-32 bg-[rgb(var(--accent-soft))] relative">
            <div className="absolute -bottom-12 left-8 flex items-end gap-6">
              <div className="relative group">
                <div className="w-28 h-28 rounded-2xl border-4 border-[rgb(var(--surface))] bg-[rgb(var(--muted))] overflow-hidden shadow-md">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[rgb(var(--text-secondary))]">
                      <FiUser size={40} />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-2 right-2 p-2 bg-[rgb(var(--primary))] text-white rounded-lg cursor-pointer hover:bg-[rgb(var(--primary-hover))] transition-colors shadow-lg">
                  <FiCamera size={16} />
                  <input
                    type="file"
                    className="hidden"
                    name="avatar"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>

              <div className="mb-2">
                <h1 className="text-2xl font-bold text-[rgb(var(--text-primary))]">
                  {user?.name}
                </h1>
                <p className="text-sm text-[rgb(var(--text-secondary))] flex items-center gap-1">
                  Member since {new Date(user?.createdAt).getFullYear()} •
                  <span className="text-[rgb(var(--success))] font-medium ml-1 flex items-center gap-0.5">
                    <FiCheckCircle size={12} /> {user?.status}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="pt-20 px-8 pb-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold text-[rgb(var(--text-primary))] uppercase tracking-widest text-xs">
                Account Details
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm font-bold text-[rgb(var(--primary))] hover:underline"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[rgb(var(--text-secondary))] uppercase tracking-tighter">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" />
                  <input
                    type="text"
                    name="name"
                    disabled={!isEditing}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-xl py-3 pl-10 pr-4 disabled:opacity-60 focus:ring-2 focus:ring-[rgb(var(--primary))/0.2] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[rgb(var(--text-secondary))] uppercase tracking-tighter">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" />
                  <input
                    type="email"
                    name="email"
                    disabled={!isEditing}
                    value={formData.email}
                    className="w-full bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-xl py-3 pl-10 pr-4 disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[rgb(var(--text-secondary))] uppercase tracking-tighter">
                  Mobile Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" />
                  <input
                    type="text"
                    name="mobile"
                    disabled={!isEditing}
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Not set"
                    className="w-full bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-xl py-3 pl-10 pr-4 disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[rgb(var(--text-secondary))] uppercase tracking-tighter">
                  Security
                </label>
                <button
                  type="button"
                  className="w-full flex items-center justify-between bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-xl py-3 px-4 text-sm font-medium hover:bg-[rgb(var(--accent-soft))] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FiLock /> Change Password
                  </span>
                  <span className="text-[rgb(var(--primary))] text-xs">
                    Update
                  </span>
                </button>
              </div>

              {isEditing && (
                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    className="bg-[rgb(var(--primary))] text-white px-8 py-3 rounded-xl font-bold hover:bg-[rgb(var(--primary-hover))] transition-all shadow-lg shadow-[rgb(var(--primary))/0.2]"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>

            {/* Danger Zone */}
            <div className="mt-12 pt-8 border-t border-[rgb(var(--border))] flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-[rgb(var(--text-primary))]">
                  Account Status
                </p>
                <p className="text-xs text-[rgb(var(--text-secondary))]">
                  Last logged in:{" "}
                  {new Date(user?.last_login_date).toLocaleDateString()}
                </p>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 text-[rgb(var(--danger))] font-bold text-sm hover:underline">
                <FiLogOut /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
