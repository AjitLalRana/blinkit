import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }
  
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  

  return (
    <button
      onClick={handleToggle}
      className="px-4 py-2 rounded-lg bg-[rgb(var(--primary))] text-white"
    >
      Toggle Theme
    </button>
  );
}

export default ThemeToggle;