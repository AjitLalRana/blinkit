import React from "react";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiGithub, FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import {useForm} from 'react-hook-form'


const Footer = () => {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const handleEmail = (data) => {
       console.log("Email submitted:", data.email);
       reset();
    }
    
  const currentYear = new Date().getFullYear();

  // Helper for consistent link styling
  const footerLinkClass = "text-sm transition-all duration-300 hover:text-[rgb(var(--primary))] flex items-center gap-1 group";

  return (
    <footer className="bg-[rgb(var(--surface))] border-t border-[rgb(var(--border))] text-[rgb(var(--text-secondary))] pt-16">
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Brand Identity - Takes more space */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-[rgb(var(--text-primary))]">
              Shop<span className="text-[rgb(var(--primary))]">Mate</span>
            </h2>
            <p className="max-w-xs leading-relaxed">
              Curating quality products that bring warmth and character to your home. 
              Experience shopping designed for the modern minimalist.
            </p>
            <div className="flex gap-4">
              {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiGithub].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="p-2 rounded-full border border-[rgb(var(--border))] hover:bg-[rgb(var(--accent-soft))] hover:text-[rgb(var(--primary))] transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-2">
            <h3 className="text-[rgb(var(--text-primary))] font-semibold mb-6 uppercase tracking-wider text-xs">Explore</h3>
            <ul className="space-y-4">
              {['Home', 'Shop', 'Categories', 'Collections'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className={footerLinkClass}>
                    {item} <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={12} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[rgb(var(--text-primary))] font-semibold mb-6 uppercase tracking-wider text-xs">Support</h3>
            <ul className="space-y-4">
              {['Contact Us', 'FAQs', 'Returns', 'Privacy'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '')}`} className={footerLinkClass}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section - Integrated into grid */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-[rgb(var(--text-primary))] font-semibold uppercase tracking-wider text-xs">Stay Inspired</h3>
            <p className="text-sm">Subscribe to receive seasonal updates and exclusive early access to sales.</p>
            <form onSubmit={handleSubmit(handleEmail)} className="flex gap-2">
              <input 
                type="email" 
                placeholder="email@example.com" 
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                className="w-full bg-[rgb(var(--muted))] border border-[rgb(var(--border))] px-4 py-2 text-sm focus:outline-none focus:border-[rgb(var(--primary))] transition-colors"
              />
              <button className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-hover))] text-[rgb(var(--surface))] px-4 py-2 text-sm font-medium transition-colors">
                Join
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="bg-[rgb(var(--muted))] border-t border-[rgb(var(--border))] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em]">
          <p>© {currentYear} ShopMate — All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[rgb(var(--text-primary))] transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-[rgb(var(--text-primary))] transition-colors">Accessibility</a>
            <a href="#" className="hover:text-[rgb(var(--text-primary))] transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;