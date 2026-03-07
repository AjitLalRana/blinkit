import React, { useState } from "react";
import { Link } from "react-router-dom";

const SubCategory = () => {
  const [activeCategory, setActiveCategory] = useState("New Arrivals");

  const categories = [
    "New Arrivals",
    "Living Room",
    "Bedroom",
    "Decor",
    "Kitchen",
    "Sale",
  ];

  return (
    <div className="border-t border-[rgb(var(--border))] bg-[rgb(var(--surface))] flex relative">
      <div className="max-w-7xl mx-auto px-8 h-10 flex items-center gap-8 text-[11px] uppercase tracking-[0.15em] font-semibold text-[rgb(var(--text-secondary))] overflow-x-auto whitespace-nowrap no-scrollbar">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/`}
            onClick={() => setActiveCategory(cat)}
            className="relative pb-2 group"
          >
            <span
              className={`transition-colors ${
                cat === activeCategory
                  ? "text-[rgb(var(--primary))]"
                  : "hover:text-[rgb(var(--primary))]"
              } ${cat === "Sale" ? "text-[rgb(var(--danger))]" : ""}`}
            >
              {cat}
            </span>

            {/* animated underline */}
            <div
              className={`absolute left-0 bottom-0 h-[2px] bg-[rgb(var(--primary))] transition-all duration-300 ${
                cat === activeCategory
                  ? "w-full"
                  : "w-0 "
              }`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubCategory;