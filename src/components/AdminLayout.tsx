import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, PlusCircle, LogOut, Home, Users, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/delight-logo.png";
import { toast } from "sonner";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? "bg-primary text-primary-foreground"
      : "text-muted-foreground hover:bg-muted hover:text-foreground"
  }`;

const AdminLayout = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/50 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2 px-6 py-5 border-b border-border">
          <img src={logo} alt="DE-LIGHT" className="h-10 w-auto" />
        </Link>
        <nav className="flex-1 p-3 space-y-1">
          <NavLink to="/admin" end className={linkClass}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={linkClass}>
            <Package size={18} /> Products
          </NavLink>
          <NavLink to="/admin/add" className={linkClass}>
            <PlusCircle size={18} /> Add Product
          </NavLink>
          <NavLink to="/admin/customers" className={linkClass}>
            <Users size={18} /> Customers
          </NavLink>
          <NavLink to="/admin/newsletter" className={linkClass}>
            <Mail size={18} /> Newsletter
          </NavLink>
        </nav>
        <div className="p-3 border-t border-border space-y-1">
          <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
            <Home size={18} /> Back to site
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut size={18} /> Sign out
          </button>
          {user?.email && (
            <p className="px-4 pt-2 text-xs text-muted-foreground truncate">{user.email}</p>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card/80 backdrop-blur-xl">
          <Link to="/admin" className="flex items-center gap-2">
            <img src={logo} alt="DE-LIGHT" className="h-8 w-auto" />
            <span className="font-heading font-semibold">Admin</span>
          </Link>
          <button onClick={handleSignOut} className="text-sm text-muted-foreground">
            <LogOut size={18} />
          </button>
        </header>
        <nav className="md:hidden flex gap-1 px-2 py-2 border-b border-border overflow-x-auto">
          <NavLink to="/admin" end className={linkClass}>Dashboard</NavLink>
          <NavLink to="/admin/products" className={linkClass}>Products</NavLink>
          <NavLink to="/admin/add" className={linkClass}>Add</NavLink>
          <NavLink to="/admin/customers" className={linkClass}>Customers</NavLink>
          <NavLink to="/admin/newsletter" className={linkClass}>Newsletter</NavLink>
        </nav>
        <main className="flex-1 p-4 md:p-8 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
