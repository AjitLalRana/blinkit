import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = (props) => {
  const navigate = useNavigate();
  

  return (
    <div className="absolute top-4 left-4 z-50" onClick={() => navigate(-1)} >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.633 10.5c0-.806.326-1.531.853-2.078l3-3a2.25 2.25 0 013.182 0l3 3a2.25 2.25 0 010 3.156l-3 3a2.25 2.25 0 01-3.182 0l-3-3A2.253 2.253 0 016.633 10.5z"
        />
      </svg>
    </div>
  );
};

export default BackButton;
