import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Image as ImageIcon, X } from 'lucide-react';

const ManageCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Placeholder data - you would replace this with a call to your backend
  const [categories, setCategories] = useState([
    { _id: '1', name: 'Living Room', image: 'https://images.unsplash.com/photo-1583847268964-b28dc2f51f92?w=100' },
    { _id: '2', name: 'Bedroom', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=100' },
  ]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[rgb(var(--text-primary))]">Categories</h2>
          <p className="text-[rgb(var(--text-secondary))] text-sm">Manage your main decor collections</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-hover))] text-white px-4 py-2 rounded-lg transition-all shadow-sm"
        >
          <Plus size={18} />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Table/List */}
      <div className="bg-[rgb(var(--surface))] rounded-xl border border-[rgb(var(--border))] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[rgb(var(--muted))] text-[rgb(var(--text-secondary))] text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">Image</th>
              <th className="px-6 py-4 font-medium">Category Name</th>
              <th className="px-6 py-4 font-medium">Created At</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgb(var(--border))]">
            {categories.map((cat) => (
              <tr key={cat._id} className="hover:bg-[rgb(var(--background))] transition-colors">
                <td className="px-6 py-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-[rgb(var(--border))] bg-[rgb(var(--muted))]">
                    {cat.image ? (
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[rgb(var(--text-secondary))]">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-[rgb(var(--text-primary))]">{cat.name}</td>
                <td className="px-6 py-4 text-sm text-[rgb(var(--text-secondary))]">Oct 12, 2023</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--primary))] transition-colors">
                    <Pencil size={18} />
                  </button>
                  <button className="text-[rgb(var(--danger))] hover:opacity-80 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-[rgb(var(--surface))] w-full max-w-md p-8 rounded-2xl shadow-2xl border border-[rgb(var(--border))] animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">New Category</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-[rgb(var(--muted))] rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <form className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Category Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Wall Decor" 
                  className="w-full p-2.5 rounded-lg border border-[rgb(var(--border))] bg-transparent focus:ring-2 focus:ring-[rgb(var(--primary))] outline-none transition-all"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium">Image URL</label>
                <input 
                  type="text" 
                  placeholder="https://..." 
                  className="w-full p-2.5 rounded-lg border border-[rgb(var(--border))] bg-transparent focus:ring-2 focus:ring-[rgb(var(--primary))] outline-none transition-all"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 border border-[rgb(var(--border))] rounded-lg hover:bg-[rgb(var(--muted))] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-[rgb(var(--primary))] text-white rounded-lg hover:bg-[rgb(var(--primary-hover))] shadow-md transition-colors"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;