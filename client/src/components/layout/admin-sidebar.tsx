import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Building2, 
  GraduationCap, 
  FileText, 
  Award,
  Users,
  MessageCircle,
  Settings,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminSidebar() {
  const [location] = useLocation();

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Universities", href: "/admin/universities", icon: Building2 },
    { name: "Programs", href: "/admin/programs", icon: GraduationCap },
    { name: "Applications", href: "/admin/applications", icon: FileText },
    { name: "Scholarships", href: "/admin/scholarships", icon: Award },
    { name: "Students", href: "/admin/students", icon: Users },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageCircle },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return location === "/admin" || location === "/admin/dashboard";
    }
    return location === href;
  };

  return (
    <div className="w-64 admin-sidebar text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="font-poppins font-bold text-xl">Admin Dashboard</h2>
        <p className="text-xs text-gray-300">Mtendere Education</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.href}>
              <a
                className={`flex items-center px-6 py-3 text-gray-300 hover:bg-primary-light hover:text-white transition-colors ${
                  isActive(item.href) ? "bg-primary-light text-white border-r-2 border-white" : ""
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </a>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/10">
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-white"
          >
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-white"
            onClick={() => window.location.href = '/api/logout'}
          >
            <LogOut className="h-4 w-4 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
