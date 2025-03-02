import React from "react";
import { Bell, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  title?: string;
  notificationCount?: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = "Tableau de bord",
  notificationCount = 3,
}) => {
  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher..."
            className="pl-10 w-64 bg-gray-50"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white">
              {notificationCount}
            </Badge>
          )}
        </Button>

        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
