import React, { useState } from 'react';
import { 
  Plus, Pencil, Trash2, Search, Filter, 
  MoreVertical, Eye, EyeOff, Package, ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageProducts = () => {
  // Mock data matching your ProductModel
  const [products] = useState([
    {
      _id: 'p1',
      name: 'Mid-Century Modern Velvet Sofa',
      image: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100'],
      category: [{ name: 'Living Room' }],
      price: 1200,
      stock: 5,
      publish: true,
      unit: 'Piece'
    },
    {
      _id: 'p2',
      name: 'Handcrafted Ceramic Vase',
      image: ['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=100'],
      category: [{ name: 'Decor' }],
      price: 45,
      stock: 0,
      publish: false,
      unit: 'Piece'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[rgb(var(--text-primary))]">Inventory</h2>
          <p className="text-[rgb(var(--text-secondary))] text-sm">Manage stock levels and product visibility</p>
        </div>
        <Link 
          to="/dashboard/add-product"
          className="flex items-center justify-center gap-2 bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-hover))] text-white px-5 py-2.5 rounded-lg transition-all shadow-sm font-medium"
        >
          <Plus size={18} />
          Add New Product
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center gap-3 bg-[rgb(var(--surface))] p-4 rounded-xl border border-[rgb(var(--border))]">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" size={18} />
          <input 
            type="text" 
            placeholder="Search products by name..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] focus:ring-2 focus:ring-[rgb(var(--primary))] outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-[rgb(var(--border))] rounded-lg hover:bg-[rgb(var(--muted))] transition-colors text-sm font-medium">
          <Filter size={16} />
          Category
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-[rgb(var(--border))] rounded-lg hover:bg-[rgb(var(--muted))] transition-colors text-sm font-medium">
          Status
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-[rgb(var(--surface))] rounded-xl border border-[rgb(var(--border))] overflow-hidden shadow-sm">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[rgb(var(--muted))] text-[rgb(var(--text-secondary))] text-xs uppercase tracking-wider border-b border-[rgb(var(--border))]">
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--border))]">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-[rgb(var(--background))] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-lg bg-[rgb(var(--muted))] overflow-hidden border border-[rgb(var(--border))] flex-shrink-0">
                        <img src={product.image[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-[rgb(var(--text-primary))] leading-tight">{product.name}</p>
                        <p className="text-xs text-[rgb(var(--text-secondary))] mt-1">ID: {product._id.toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[rgb(var(--text-secondary))]">
                      {product.category[0]?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-[rgb(var(--text-primary))]">
                      ${product.price.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className={`text-sm font-bold ${product.stock > 0 ? 'text-[rgb(var(--text-primary))]' : 'text-[rgb(var(--danger))]'}`}>
                        {product.stock > 0 ? product.stock : 'Out of Stock'}
                      </span>
                      <span className="text-[10px] text-[rgb(var(--text-secondary))] uppercase">{product.unit}s</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {product.publish ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgb(var(--success))]/10 text-[rgb(var(--success))] text-xs font-bold border border-[rgb(var(--success))]/20">
                        <Eye size={12} /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgb(var(--text-secondary))]/10 text-[rgb(var(--text-secondary))] text-xs font-bold border border-[rgb(var(--border))]">
                        <EyeOff size={12} /> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button title="Edit" className="p-2 hover:bg-[rgb(var(--accent-soft))] text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--primary))] rounded-lg transition-colors">
                        <Pencil size={18} />
                      </button>
                      <button title="Delete" className="p-2 hover:bg-red-50 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--danger))] rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="px-6 py-4 bg-[rgb(var(--muted))] border-t border-[rgb(var(--border))] flex justify-between items-center text-sm text-[rgb(var(--text-secondary))]">
          <span>Showing 1 to 2 of 48 products</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-[rgb(var(--border))] rounded bg-[rgb(var(--surface))] hover:bg-[rgb(var(--muted))] disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 border border-[rgb(var(--border))] rounded bg-[rgb(var(--surface))] hover:bg-[rgb(var(--muted))]">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;