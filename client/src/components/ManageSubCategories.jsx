import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Layers, X, ChevronDown } from 'lucide-react';

const ManageSubCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mock data for Categories (needed for the dropdown)
  const categories = [
    { _id: 'c1', name: 'Living Room' },
    { _id: 'c2', name: 'Kitchen & Dining' },
  ];

  // Mock data for Sub-Categories
  const [subCategories, setSubCategories] = useState([
    { 
      _id: 's1', 
      name: 'Coffee Tables', 
      image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=100',
      category: [{ _id: 'c1', name: 'Living Room' }] 
    },
    { 
      _id: 's2', 
      name: 'Dinnerware', 
      image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=100',
      category: [{ _id: 'c2', name: 'Kitchen & Dining' }] 
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[rgb(var(--text-primary))]">Sub-Categories</h2>
          <p className="text-[rgb(var(--text-secondary))] text-sm">Organize products into specific niche groups</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-hover))] text-white px-4 py-2 rounded-lg transition-all shadow-md"
        >
          <Plus size={18} />
          <span>New Sub-Category</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-[rgb(var(--surface))] rounded-xl border border-[rgb(var(--border))] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[rgb(var(--muted))] text-[rgb(var(--text-secondary))] text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">Image</th>
              <th className="px-6 py-4 font-medium">Sub-Category</th>
              <th className="px-6 py-4 font-medium">Parent Category</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgb(var(--border))]">
            {subCategories.map((sub) => (
              <tr key={sub._id} className="hover:bg-[rgb(var(--background))] transition-colors">
                <td className="px-6 py-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-[rgb(var(--border))] bg-[rgb(var(--muted))]">
                    <img src={sub.image} alt={sub.name} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-[rgb(var(--text-primary))]">{sub.name}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-[rgb(var(--accent-soft))] text-[rgb(var(--primary))] text-xs font-bold rounded-full border border-[rgb(var(--accent))] uppercase tracking-tighter">
                    {sub.category[0]?.name || "Uncategorized"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--primary))]">
                    <Pencil size={18} />
                  </button>
                  <button className="text-[rgb(var(--danger))] hover:opacity-70">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[rgb(var(--surface))] w-full max-w-md p-8 rounded-2xl shadow-2xl border border-[rgb(var(--border))] animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Add Sub-Category</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-[rgb(var(--muted))] rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form className="space-y-5">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Minimalist Vases" 
                  className="w-full p-2.5 rounded-lg border border-[rgb(var(--border))] bg-transparent focus:ring-2 focus:ring-[rgb(var(--primary))] outline-none"
                />
              </div>

              {/* Category Select */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Parent Category</label>
                <div className="relative">
                  <select className="w-full p-2.5 rounded-lg border border-[rgb(var(--border))] bg-transparent focus:ring-2 focus:ring-[rgb(var(--primary))] outline-none appearance-none cursor-pointer">
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 pointer-events-none text-[rgb(var(--text-secondary))]" size={18} />
                </div>
              </div>
              
              {/* Image */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Image URL</label>
                <input 
                  type="text" 
                  placeholder="Paste URL here" 
                  className="w-full p-2.5 rounded-lg border border-[rgb(var(--border))] bg-transparent focus:ring-2 focus:ring-[rgb(var(--primary))] outline-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 border border-[rgb(var(--border))] rounded-lg hover:bg-[rgb(var(--muted))]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-[rgb(var(--primary))] text-white rounded-lg hover:bg-[rgb(var(--primary-hover))] shadow-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSubCategories;