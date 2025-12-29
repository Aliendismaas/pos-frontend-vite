import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux Toolkit/features/user/userThunks";
import {
  LayoutDashboard,
  Store,
  Users,
  ShoppingCart,
  BarChart2,
  Settings,
  FileText,
  Tag,
  Truck,
  CreditCard,
  Menu,
  X,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { BadgeDollarSign } from "lucide-react";

const navLinks = [
  {
    name: "Dashboard",
    path: "/store/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Stores",
    path: "/store/stores",
    icon: <Store className="w-5 h-5" />,
  },
  {
    name: "Branches",
    path: "/store/branches",
    icon: <Store className="w-5 h-5" />,
  },
  {
    name: "Products",
    path: "/store/products",
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    name: "Categories",
    path: "/store/categories",
    icon: <Tag className="w-5 h-5" />,
  },
  {
    name: "Employees",
    path: "/store/employees",
    icon: <Users className="w-5 h-5" />,
  },
  {
    name: "Alerts",
    path: "/store/alerts",
    icon: <Truck className="w-5 h-5" />,
  },
  {
    name: "Sales",
    path: "/store/sales",
    icon: <BarChart2 className="w-5 h-5" />,
  },

  {
    name: "Reports",
    path: "/store/reports",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    name: "Upgrade Plan",
    path: "/store/upgrade",
    icon: <BadgeDollarSign className="w-5 h-5" />,
  },
  {
    name: "Settings",
    path: "/store/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function StoreSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
    // className="h-screen w-64 bg-sidebar dark:bg-black border-r border-sidebar-border flex flex-col py-6 px-4 shadow-lg"
     className={`
          fixed lg:relative
          inset-y-0 left-0 z-40
          h-screen w-64 md:w-72 lg:w-64 xl:w-72
          bg-sidebar dark:bg-black border-r border-sidebar-border
          flex flex-col py-6 px-4 shadow-lg
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
    >
      <div className="mb-8 text-2xl font-extrabold text-primary tracking-tight flex items-center gap-2">
        <Store className="w-7 h-7 text-primary" />
        POS Admin
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                onClick={closeMobileMenu}
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
          className="w-full"
        >
          Logout
        </Button>
      </div>
    </aside>
    </>
  );
}
