import React, { useState } from 'react';
import { Upload, X, Plus, Info, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [specifications, setSpecifications] = useState([{ label: '', value: '' }]);

  // Handlers for dynamic specification fields (more_details)
  const addSpec = () => setSpecifications([...specifications, { label: '', value: '' }]);
  const removeSpec = (index) => setSpecifications(specifications.filter((_, i) => i !== index));

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 hover:bg-[rgb(var(--muted))] rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <h2 className="text-2xl font-serif font-bold text-[rgb(var(--text-primary))]">New Product</h2>
          <p className="text-[rgb(var(--text-secondary))] text-sm">Fill in the details to list a new item in your collection</p>
        </div>
      </div>

      <form className="space-y-8">
        {/* 1. IMAGE UPLOAD SECTION */}
        <section className="bg-[rgb(var(--surface))] p-6 rounded-xl border border-[rgb(var(--border))] shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Upload size={18} className="text-[rgb(var(--primary))]" /> Product Gallery
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-[rgb(var(--border))]">
                <img src={img} alt="preview" className="w-full h-full object-cover" />
                <button className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"><X size={12} /></button>
              </div>
            ))}
            <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-[rgb(var(--border))] rounded-lg cursor-pointer hover:bg-[rgb(var(--muted))] transition-colors">
              <Plus size={24} className="text-[rgb(var(--text-secondary))]" />
              <span className="text-xs text-[rgb(var(--text-secondary))] mt-2">Upload</span>
              <input type="file" className="hidden" multiple />
            </label>
          </div>
        </section>

        {/* 2. BASIC INFORMATION */}
        <section className="bg-[rgb(var(--surface))] p-6 rounded-xl border border-[rgb(var(--border))] shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input type="text" className="w-full p-2.5 rounded-lg border border-[rgb(var(--border))] bg-transparent outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]" placeholder="e.g. Hand-Woven Rattan Armchair" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select className="w-full p-2.5 rounded-lg border border-[rgb(var(--border))] bg-transparent outline-none cursor-pointer">
              <option>Select Category</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Sub-Category</label>
            <select className="w-full p-2.5 rounded-lg border border-[rgb(var(--border))] bg-transparent outline-none cursor-pointer">
              <option>Select Sub-Category</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea rows="4" className="w-full p-2.5 rounded-lg border border-[rgb(var(--border))] bg-transparent outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]" placeholder="Describe the craftsmanship, materials, and vibe..."></textarea>
          </div>
        </section>

        {/* 3. INVENTORY & PRICING */}
        <section className="bg-[rgb(var(--surface))] p-6 rounded-xl border border-[rgb(var(--border))] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Price ($)</label>
            <input type="number" className="w-full p-2.5 rounded-lg border border-[rgb(var(--border))] bg-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Discount (%)</label>
            <input type="number" className="w-full p-2.5 rounded-lg border border-[rgb(var(--border))] bg-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock Quantity</label>
            <input type="number" className="w-full p-2.5 rounded-lg border border-[rgb(var(--border))] bg-transparent outline-none" />
          </div>
        </section>

        {/* 4. MORE DETAILS (Technical Specs) */}
        <section className="bg-[rgb(var(--surface))] p-6 rounded-xl border border-[rgb(var(--border))] shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Info size={18} className="text-[rgb(var(--primary))]" /> Specifications
            </h3>
            <button type="button" onClick={addSpec} className="text-sm text-[rgb(var(--primary))] font-medium flex items-center gap-1">
              <Plus size={14} /> Add Spec
            </button>
          </div>
          
          <div className="space-y-3">
            {specifications.map((spec, index) => (
              <div key={index} className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="Label (e.g. Material)" 
                  className="flex-1 p-2 rounded-lg border border-[rgb(var(--border))] bg-transparent text-sm"
                />
                <input 
                  type="text" 
                  placeholder="Value (e.g. Oak Wood)" 
                  className="flex-1 p-2 rounded-lg border border-[rgb(var(--border))] bg-transparent text-sm"
                />
                <button type="button" onClick={() => removeSpec(index)} className="p-2 text-red-400 hover:text-red-600">
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SUBMIT BUTTONS */}
        <div className="flex items-center justify-end gap-4 border-t border-[rgb(var(--border))] pt-8">
          <button type="button" className="px-6 py-2.5 rounded-lg border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))] transition-colors">
            Save as Draft
          </button>
          <button type="submit" className="px-8 py-2.5 rounded-lg bg-[rgb(var(--primary))] text-white font-bold hover:bg-[rgb(var(--primary-hover))] shadow-lg shadow-[rgb(var(--primary))]/20 transition-all">
            Publish Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;