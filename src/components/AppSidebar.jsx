import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Home, Users, Settings, LogOut, Calendar, Archive } from "lucide-react";
import { Link, useLocation } from "react-router";

export default function AppSidebar() {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Event", path: "/events", icon: Calendar },
    { name: "Daftar Arsip", path: "/archives", icon: Archive },
    { name: "Pengaturan", path: "/settings", icon: Settings },
  ];

  return (
    <Sidebar>
      {/* HEADER */}
      <SidebarHeader className="py-5">
        <h1 className="text-3xl font-bold">Spentaru Archive</h1>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        <SidebarMenu className="gap-2">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive = location.pathname === menu.path;

            return (
              <SidebarMenuItem key={menu.path}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link to={menu.path} className="flex items-center gap-2">
                    <Icon size={18} />
                    <span>{menu.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="p-4 text-sm text-muted-foreground">
        <SidebarMenuButton asChild>
          <button className="flex items-center justify-between cursor-pointer">
            Logout
            <LogOut size={18} />
          </button>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
