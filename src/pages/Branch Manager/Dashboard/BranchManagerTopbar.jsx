import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Bell, Search, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "../../../components/ui/input";

export default function BranchManagerTopbar() {
  const { userProfile } = useSelector((state) => state.user);
  const { branch } = useSelector((state) => state.branch);

    const [showMobileSearch, setShowMobileSearch] = useState(false);
  return (
    <header className="bg-background dark:bg-black border-b px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-foreground">
          {branch ? branch.name : "Branch Dashboard"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="flex items-center gap-4 sm:gap-3 lg:gap-4">
      <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search Orders, users..."
              className="pl-10 w-48 xl:w-64"
            />
      </div>
           

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

          
        <ThemeToggle />
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
            3
          </Badge>
        </Button>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-foreground">{userProfile?.fullName || "Branch Manager"}</p>
            <p className="text-xs text-muted-foreground">{userProfile?.email || "manager@example.com"}</p>
          </div>
        </div>
      </div>


    </header>
  );
}