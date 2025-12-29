import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../../../components/ui/button";
import { useSidebar } from "../../../context/hooks/useSidebar";
import { Menu, Wifi } from "lucide-react";
import { useSelector } from "react-redux";

const POSHeader = () => {
  const { setSidebarOpen } = useSidebar();
  const { branch } = useSelector((state) => state.branch);
  const { userProfile } = useSelector((state) => state.user);

  return (
    <div className="bg-card border-b  px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="z-10 p-2 rounded shadow-lg border border-border"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            
          >
            {/* <Menu className="h-6 w-6" /> */}
           <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
          
          <div>
            <h1 className="text-xl font-bold text-foreground">PESA FLOW POS</h1>
            <p className="text-sm text-muted-foreground">
              Cashier • {branch?.name || "Branch"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge 
            variant="outline" 
            className="bg-green-500/10 text-green-500 border-green-500/30 flex items-center gap-2"
          >
            <Wifi className="h-3 w-3" />
            ONLINE
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default POSHeader;