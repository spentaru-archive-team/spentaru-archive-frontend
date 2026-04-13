import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { logout } from "@/services/auth.service";

import {
  Archive,
  Calendar,
  ChevronRight,
  Home,
  LogOut,
  Settings,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";

export default function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Event", path: "/events", icon: Calendar },
    { name: "Daftar Arsip", path: "/archives", icon: Archive },
    { name: "Pengaturan", path: "/settings", icon: Settings },
  ];

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await logout();
      if (res.data.status) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="gap-4 px-4 py-4">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="min-w-0 space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/65">
                Dashboard
              </p>
              <h1 className="text-xl font-semibold tracking-tight text-foreground">
                Spentaru Archive
              </h1>
              <p className="text-sm leading-5 text-muted-foreground">
                Dashboard arsip sekolah yang rapi dan terpusat.
              </p>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 pb-3">
        {/* <div className="mb-3 rounded-sm border border-border/80 bg-white px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">
            Navigasi
          </p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Kelola dokumen, agenda, dan pengaturan arsip Spentaru dari satu
            panel.
          </p>
        </div> */}

        <SidebarMenu className="gap-2">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const isActive = location.pathname === menu.path;

            return (
              <SidebarMenuItem key={menu.path}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className="group"
                >
                  <Link to={menu.path} className="flex items-center gap-3">
                    <Icon size={18} />
                    <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                      <span className="truncate">{menu.name}</span>
                      <ChevronRight
                        size={16}
                        className="text-primary/40 transition group-data-[active=true]/menu-button:translate-x-0.5 group-data-[active=true]/menu-button:text-primary"
                      />
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <hr className="mx-4 opacity-70" />

      <SidebarFooter className="px-3 pb-4">
        <SidebarMenuButton asChild className="min-h-14">
          <button
            className="flex items-center justify-between gap-3 cursor-pointer"
            onClick={handleLogout}
          >
            <span className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-primary/10 bg-primary/10 text-primary">
                <LogOut size={18} />
              </span>
              <span className="text-left">
                <span className="block text-sm font-semibold text-foreground">
                  Logout
                </span>
                <span className="block text-xs text-muted-foreground">
                  Keluar dari dashboard
                </span>
              </span>
            </span>
            <ChevronRight size={16} className="text-primary/45" />
          </button>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
