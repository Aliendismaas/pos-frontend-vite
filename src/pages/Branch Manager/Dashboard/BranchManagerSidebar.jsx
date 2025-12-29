import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Redux Toolkit/features/user/userThunks";
import {
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  Package,
  Users,
  UserCircle,
  FileText,
  Settings,
  LogOut,
  X,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const navLinks = [
  {
    name: "Dashboard",
    path: "/branch/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Orders",
    path: "/branch/orders",
    icon: <ShoppingBag className="w-5 h-5" />,
  },
  {
    name: "Refunds",
    path: "/branch/refunds",
    icon: <RefreshCw className="w-5 h-5" />,
  },
  {
    name: "Transactions",
    path: "/branch/transactions",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    name: "Inventory",
    path: "/branch/inventory",
    icon: <Package className="w-5 h-5" />,
  },
  {
    name: "Employees",
    path: "/branch/employees",
    icon: <Users className="w-5 h-5" />,
  },
  {
    name: "Customers",
    path: "/branch/customers",
    icon: <UserCircle className="w-5 h-5" />,
  },
  {
    name: "Reports",
    path: "/branch/reports",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    name: "Settings",
    path: "/branch/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function BranchManagerSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { branch } = useSelector((state) => state.branch);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <>

    <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-sidebar dark:bg-gray-900 border border-sidebar-border shadow-lg rounded-lg p-2 hover:bg-sidebar-accent transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={closeMobileMenu}
        />
      )}

    <aside
       className={`
          fixed lg:relative
          inset-y-0 left-0 z-40
          h-screen w-64 md:w-72 lg:w-64 xl:w-72
          bg-sidebar dark:bg-black border-r border-sidebar-border
          flex flex-col py-6 px-4 shadow-lg
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
    
      // className="h-screen w-64 bg-sidebar dark:bg-black border-r border-sidebar-border flex flex-col py-6 px-4 shadow-lg"
    >
      <div className="mb-8 text-2xl font-extrabold text-primary tracking-tight flex items-center gap-2">
        <Package className="w-7 h-7 text-primary" />
        Branch Manager
      </div>
      {branch && (
        <div className="mb-6 px-4 py-3 bg-sidebar-accent rounded-lg">
          <h3 className="font-medium text-sidebar-accent-foreground">{branch.name}</h3>
          <p className="text-xs text-sidebar-accent-foreground/70 mt-1">{branch.address}</p>
        </div>
      )}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
               onClick={closeMobileMenu}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-base font-medium group ${
                  location.pathname.startsWith(link.path)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <span
                  className={`transition-colors ${
                    location.pathname.startsWith(link.path)
                      ? "text-sidebar-primary"
                      : "text-sidebar-foreground/60 group-hover:text-sidebar-primary"
                  }`}
                >
                  {link.icon}
                </span>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <Button
          onClick={handleLogout}
          variant=""
          className="flex items-center gap-3 rounded-lg transition-colors text-base font-medium w-full text-left "
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </aside>
    </>
  );
}