import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Bell, User, Search, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SuperAdminTopbar() {
  const { userProfile } = useSelector((state) => state.user);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border px-4 sm:px-6 py-3 sm:py-4 dark:bg-black sticky top-0 z-30">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Section - Title */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1 lg:flex-initial">
          {/* Mobile: Show abbreviated title */}
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground truncate">
            <span className="hidden sm:inline">Super Admin Panel</span>
            <span className="sm:hidden ml-12 text-center">Admin Panel</span>
          </h1>
        </div>
        
        {/* Right Section - Actions */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Desktop Search */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search stores, users..."
              className="pl-10 w-48 xl:w-64"
            />
          </div>

          {/* Mobile Search Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="lg:hidden"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            {showMobileSearch ? (
              <X className="w-5 h-5" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-lg">
              3
            </span>
          </Button>
          
          {/* User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* User Info - Hidden on small screens, shown on medium+ */}
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-foreground truncate max-w-[120px] lg:max-w-[200px]">
                {userProfile?.fullName || "Super Admin"}
              </p>
              <p className="text-xs text-muted-foreground truncate max-w-[120px] lg:max-w-[200px]">
                {userProfile?.email || "admin@pos.com"}
              </p>
            </div>
            
            {/* User Avatar Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-sidebar-accent transition-colors"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar - Expands below header */}
      {showMobileSearch && (
        <div className="lg:hidden mt-3 animate-in slide-in-from-top-2 duration-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search stores, users..."
              className="pl-10 w-full"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}