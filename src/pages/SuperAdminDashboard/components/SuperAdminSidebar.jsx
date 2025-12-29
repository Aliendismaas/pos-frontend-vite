import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux Toolkit/features/user/userThunks";
import {
  LayoutDashboard,
  Store,
  Download,
  Settings,
  FileText,
  DollarSign,
  Clock,
  Menu,
  X,
} from "lucide-react";
import { Button } from "../../../components/ui/button";

const navLinks = [
  {
    name: "Dashboard",
    path: "/super-admin/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Stores",
    path: "/super-admin/stores",
    icon: <Store className="w-5 h-5" />,
  },
  {
    name: "Subscription Plans",
    path: "/super-admin/subscriptions",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    name: "Pending Requests",
    path: "/super-admin/requests",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    name: "Settings",
    path: "/super-admin/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function SuperAdminSidebar() {
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
      {/* Mobile Menu Button - Fixed position */}
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

      {/* Sidebar */}
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
      >
        {/* Header */}
        <div className="mb-8 text-2xl font-extrabold text-primary tracking-tight flex items-center gap-2 lg:gap-3">
          <Store className="w-7 h-7 lg:w-8 lg:h-8 text-primary flex-shrink-0" />
          <span className="truncate">Super Admin</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 md:py-2.5 rounded-lg transition-all duration-200 text-base font-medium group ${
                    location.pathname.startsWith(link.path)
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-sm"
                  }`}
                >
                  <span
                    className={`transition-colors flex-shrink-0 ${
                      location.pathname.startsWith(link.path)
                        ? "text-sidebar-primary"
                        : "text-sidebar-foreground/60 group-hover:text-sidebar-primary"
                    }`}
                  >
                    {link.icon}
                  </span>
                  <span className="truncate">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto pt-4 border-t border-sidebar-border">
          <Button
            onClick={() => {
              handleLogout();
              closeMobileMenu();
            }}
            variant="ghost"
            className="flex items-center gap-3 rounded-lg transition-all duration-200 text-base font-medium w-full text-left hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-log-out w-5 h-5 flex-shrink-0"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="17 16 22 12 17 8" />
              <line x1="22" x2="10" y1="12" y2="12" />
            </svg>
            <span className="truncate">Logout</span>
          </Button>
        </div>
      </aside>
    </>
  );
}