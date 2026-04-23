import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Confirm from "@/components/Confirm";
import { useAuth } from "@/hooks/use-auth";
import Logo from "@/assets/logo.png";

import {
  Archive,
  ChevronDown,
  ChevronRight,
  Clipboard,
  Home,
  LogOut,
  MapPinSearch,
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
import { useMemo, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const initMenus = [
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

const guruMenus = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Arsip", path: "/archives", icon: Archive },
  { name: "Lokasi Arsip", path: "/archive-locations", icon: MapPinSearch },
  { name: "Pengaturan", path: "/settings", icon: Settings },
];

export default function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, logout: clearAuthState } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menus = useMemo(() => {
    if (loading) return [];
    if (user?.role === "guru") return guruMenus;
    if (user?.role === "admin") return initMenus;
    return [];
  }, [loading, user?.role]);

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoggingOut(true);

    try {
      await clearAuthState();
    } catch (err) {
      console.log(err.response);
    }
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
        <SidebarTrigger className="hidden lg:flex absolute top-4 -right-14 z-10 p-4 bg-background border border-input" />

        <SidebarHeader className="gap-4 px-4 py-4">
          <div className="px-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="min-w-0 space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/65">
                  Dashboard
                </p>
                <h1 className="text-xl flex gap-1 mb-3 items-center font-semibold tracking-tight text-foreground">
                  <img src={Logo} alt="Logo" className="h-8 w-8" />
                  <span>Spentaru Archive</span>
                </h1>
              </div>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-3 pb-3">
          <SidebarMenu className="gap-2">
            {loading &&
              Array.from({ length: 5 }).map((_, idx) => (
                <SidebarMenuItem key={`menu-skeleton-${idx}`}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              ))}

            {menus.map((menu) => {
              const Icon = menu.icon;
              const hasSubMenu = Array.isArray(menu.items);
              const isActive = menu.path && location.pathname === menu.path;
              const isSubMenuActive =
                hasSubMenu &&
                menu.items.some(
                  (subMenu) => location.pathname === subMenu.path,
                );

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
                    {user?.name || <Skeleton className="h-3 w-40" />}
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
