import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Grid2X2, Layers, PackagePlus, ShoppingBag } from "lucide-react";

const AdminDashboard = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Overview", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Categories", path: "/admin/dashboard/categories", icon: <Grid2X2 size={20} /> },
    { name: "Sub Categories", path: "/admin/dashboard/sub-categories", icon: <Layers size={20} /> },
    { name: "Products", path: "/admin/dashboard/products", icon: <ShoppingBag size={20} /> },
    { name: "Add Product", path: "/admin/dashboard/add-product", icon: <PackagePlus size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[rgb(var(--background))] text-[rgb(var(--text-primary))]">
      
      {/* SIDEBAR */}
      <aside className="w-64 h-screen sticky top-0 border-r bg-[rgb(var(--surface))] hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-serif font-bold text-[rgb(var(--primary))] uppercase tracking-wider">
            Admin
          </h2>
        </div>

        <nav className="mt-4 px-4 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-[rgb(var(--primary))] text-white shadow-md"
                    : "hover:bg-[rgb(var(--accent-soft))] text-[rgb(var(--text-secondary))]"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen">
        
        {/* HEADER */}
        <header className="h-16 shrink-0 border-b border-[rgb(var(--border))] bg-[rgb(var(--surface))] flex items-center justify-between px-8">
          <h1 className="text-lg font-medium capitalize">
            {location.pathname.split("/").pop() || "Dashboard Overview"}
          </h1>

          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-[rgb(var(--accent))] flex items-center justify-center text-white text-xs">
              AD
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;