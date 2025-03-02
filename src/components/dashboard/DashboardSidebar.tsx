import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Calendar,
  BookOpen,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  User,
  FileText,
  Users,
  Clock,
  BarChart,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/lib/auth";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface DashboardSidebarProps {
  userType?: UserRole;
  userName?: string;
  userAvatar?: string;
  activePath?: string;
}

const SidebarLink = ({
  to,
  icon,
  label,
  active = false,
  onClick,
}: SidebarLinkProps) => {
  if (onClick) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="lg"
              className={cn(
                "w-full justify-start gap-3 mb-1",
                active ? "bg-primary/10 text-primary" : "hover:bg-primary/5",
              )}
              onClick={onClick}
            >
              {icon}
              <span className="truncate">{label}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={to}>
            <Button
              variant="ghost"
              size="lg"
              className={cn(
                "w-full justify-start gap-3 mb-1",
                active ? "bg-primary/10 text-primary" : "hover:bg-primary/5",
              )}
            >
              {icon}
              <span className="truncate">{label}</span>
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const DashboardSidebar = ({
  userType,
  userName,
  userAvatar,
  activePath = "/dashboard",
}: DashboardSidebarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Use user data from auth context if available
  const currentUserType = userType || user?.role || "student";
  const currentUserName = userName || user?.name || "User";
  const currentUserAvatar = userAvatar || user?.avatar || "";

  // Define navigation links based on user type
  const getNavLinks = () => {
    const dashboardPath = `/dashboard/${currentUserType}`;

    const commonLinks = [
      { to: dashboardPath, icon: <Home size={20} />, label: "Tableau de bord" },
      { to: "/calendar", icon: <Calendar size={20} />, label: "Calendrier" },
      { to: "/messages", icon: <MessageSquare size={20} />, label: "Messages" },
    ];

    switch (currentUserType) {
      case "student":
        return [
          ...commonLinks,
          { to: "/courses", icon: <BookOpen size={20} />, label: "Cours" },
          { to: "/grades", icon: <FileText size={20} />, label: "Notes" },
          {
            to: "/schedule",
            icon: <Clock size={20} />,
            label: "Emploi du temps",
          },
        ];
      case "teacher":
        return [
          ...commonLinks,
          {
            to: "/dashboard/teacher",
            icon: <BookOpen size={20} />,
            label: "Cours",
            onClick: () => {
              navigate("/dashboard/teacher");
              setTimeout(() => {
                const coursesTab = document.querySelector('[value="courses"]');
                if (coursesTab) {
                  coursesTab.dispatchEvent(
                    new MouseEvent("click", { bubbles: true }),
                  );
                }
              }, 100);
            },
          },
          { to: "/classes", icon: <Users size={20} />, label: "Classes" },
          {
            to: "/dashboard/teacher",
            icon: <Clock size={20} />,
            label: "Présence",
            onClick: () => {
              navigate("/dashboard/teacher");
              setTimeout(() => {
                const attendanceTab = document.querySelector(
                  '[value="attendance"]',
                );
                if (attendanceTab) {
                  attendanceTab.dispatchEvent(
                    new MouseEvent("click", { bubbles: true }),
                  );
                }
              }, 100);
            },
          },
          {
            to: "/dashboard/teacher",
            icon: <FileText size={20} />,
            label: "Notes",
            onClick: () => {
              navigate("/dashboard/teacher");
              setTimeout(() => {
                const gradesTab = document.querySelector('[value="grades"]');
                if (gradesTab) {
                  gradesTab.dispatchEvent(
                    new MouseEvent("click", { bubbles: true }),
                  );
                }
              }, 100);
            },
          },
          {
            to: "/dashboard/teacher",
            icon: <Clock size={20} />,
            label: "Emploi du temps",
            onClick: () => {
              navigate("/dashboard/teacher");
              setTimeout(() => {
                const scheduleTab =
                  document.querySelector('[value="schedule"]');
                if (scheduleTab) {
                  scheduleTab.dispatchEvent(
                    new MouseEvent("click", { bubbles: true }),
                  );
                }
              }, 100);
            },
          },
        ];
      case "parent":
        return [
          ...commonLinks,
          { to: "/children", icon: <Users size={20} />, label: "Enfants" },
          { to: "/grades", icon: <FileText size={20} />, label: "Notes" },
          {
            to: "/schedule",
            icon: <Clock size={20} />,
            label: "Emploi du temps",
          },
        ];
      case "admin":
        return [
          ...commonLinks,
          { to: "/students", icon: <Users size={20} />, label: "Élèves" },
          { to: "/teachers", icon: <Users size={20} />, label: "Enseignants" },
          {
            to: "/schedule",
            icon: <Clock size={20} />,
            label: "Emploi du temps",
          },
          {
            to: "/schedule-builder",
            icon: <Clock size={20} />,
            label: "Créateur d'emploi du temps",
          },
          { to: "/reports", icon: <BarChart size={20} />, label: "Rapports" },
        ];
      default:
        return commonLinks;
    }
  };

  const navLinks = getNavLinks();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Fonction pour traduire le type d'utilisateur
  const translateUserType = (type: string) => {
    switch (type) {
      case "student":
        return "Élève";
      case "teacher":
        return "Enseignant";
      case "parent":
        return "Parent";
      case "admin":
        return "Administrateur";
      default:
        return type;
    }
  };

  return (
    <div className="h-full w-[250px] bg-white border-r flex flex-col">
      {/* School Logo */}
      <div className="p-4 border-b">
        <Link to="/">
          <h2 className="text-xl font-bold text-primary">EduSmart</h2>
          <p className="text-sm text-muted-foreground">
            Système de Gestion Scolaire
          </p>
        </Link>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b flex items-center gap-3">
        <Avatar>
          <AvatarImage src={currentUserAvatar} alt={currentUserName} />
          <AvatarFallback>
            {currentUserName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium truncate">{currentUserName}</p>
          <p className="text-xs text-muted-foreground capitalize">
            {translateUserType(currentUserType)}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 overflow-y-auto">
        {navLinks.map((link) => (
          <SidebarLink
            key={link.to + link.label}
            to={link.to}
            icon={link.icon}
            label={link.label}
            active={activePath === link.to}
            onClick={link.onClick}
          />
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t">
        <SidebarLink
          to="/notifications"
          icon={<Bell size={20} />}
          label="Notifications"
          active={activePath === "/notifications"}
        />
        <SidebarLink
          to="/settings"
          icon={<Settings size={20} />}
          label="Paramètres"
        />
        <SidebarLink to="/profile" icon={<User size={20} />} label="Profil" />
        <SidebarLink
          to="#"
          icon={<LogOut size={20} />}
          label="Déconnexion"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default DashboardSidebar;
