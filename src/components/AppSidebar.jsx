import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import Confirm from "@/components/Confirm";
import { logout } from "@/services/auth.service";
import { useAuth } from "@/hooks/use-auth";

import {
  Archive,
  ChevronDown,
  ChevronRight,
  Clipboard,
  Home,
  LogOut,
  Settings,
  Signpost,
  User,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout: clearAuthState } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menus = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    {
      name: "Manajemen",
      icon: Archive,
      items: [
        { name: "Event", path: "/events" },
        { name: "Arsip", path: "/archives" },
        { name: "Lokasi Arsip", path: "/archive-locations" },
        { name: "Kategori", path: "/categories" },
        { name: "User", path: "/users" },
      ],
    },
    { name: "Storage Rules", path: "/storage-rules", icon: Clipboard },
    { name: "Lokasi Fisik", path: "/physical-locations", icon: Signpost },
    { name: "Pengaturan", path: "/settings", icon: Settings },
  ];

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoggingOut(true);

    try {
      await logout();
    } catch (err) {
      console.log(err.response);
    }

    clearAuthState();
    setConfirmOpen(false);

    setTimeout(() => {
      navigate("/login", {
        replace: true,
        state: {
          popup: {
            title: "Logout berhasil",
            description: "Sesi Anda telah diakhiri dengan aman.",
            type: "logout",
            duration: 3000,
          },
        },
      });
      setIsLoggingOut(false);
    }, 150);
  };

  return (
    <>
      <Confirm
        open={confirmOpen}
        title="Konfirmasi logout"
        description="Pastikan seluruh pekerjaan Anda sudah selesai sebelum keluar dari sistem."
        confirmLabel="Ya, Logout"
        cancelLabel="Batalkan"
        loading={isLoggingOut}
        onConfirm={handleLogout}
        onClose={() => {
          if (isLoggingOut) return;
          setConfirmOpen(false);
        }}
      />

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
          <SidebarMenu className="gap-2">
            {menus.map((menu) => {
              const Icon = menu.icon;
              const hasSubMenu = Array.isArray(menu.items);
              const isActive = menu.path && location.pathname === menu.path;
              const isSubMenuActive =
                hasSubMenu &&
                menu.items.some((subMenu) => location.pathname === subMenu.path);

              if (hasSubMenu) {
                return (
                  <SidebarMenuItem key={menu.name}>
                    <Collapsible defaultOpen={isSubMenuActive}>
                      <SidebarMenuButton
                        asChild
                        isActive={isSubMenuActive}
                        className="group"
                      >
                        <CollapsibleTrigger className="group/collapsible flex items-center justify-between gap-3 cursor-pointer">
                          <Icon size={18} />
                          <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                            <span className="truncate">{menu.name}</span>
                            <ChevronDown
                              size={16}
                              className="text-primary/40 transition-transform group-data-[state=open]/collapsible:rotate-180 group-data-[active=true]/menu-button:translate-x-0.5 group-data-[active=true]/menu-button:text-primary"
                            />
                          </span>
                        </CollapsibleTrigger>
                      </SidebarMenuButton>

                      <CollapsibleContent className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                        <SidebarMenuSub className="mt-1">
                          {menu.items.map((subMenu) => {
                            const isSubActive =
                              location.pathname === subMenu.path;

                            return (
                              <SidebarMenuSubItem key={subMenu.path}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isSubActive}
                                >
                                  <Link to={subMenu.path}>{subMenu.name}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                );
              }

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
            <button className="flex items-center justify-between gap-3 cursor-pointer">
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-primary/10 bg-primary/10 text-primary">
                  <User size={18} />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-semibold text-foreground">
                    {user?.email || (
                      <Skeleton className="h-3 w-40" />
                    )}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {user?.role ? (
                      <>
                        {String(user.role).charAt(0).toUpperCase() +
                          String(user.role).slice(1).toLowerCase()}
                      </>
                    ) : (
                      <Skeleton className="mt-1 h-3 w-12" />
                    )}
                  </span>
                </span>
              </span>
            </button>
          </SidebarMenuButton>
          <SidebarMenuButton asChild className="min-h-14">
            <button
              className="flex items-center justify-between gap-3 cursor-pointer"
              onClick={() => setConfirmOpen(true)}
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
    </>
  );
}
