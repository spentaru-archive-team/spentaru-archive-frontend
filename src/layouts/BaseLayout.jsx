import AiChatWidget from "@/components/AiChatWidget";
import AppSidebar from "@/components/AppSidebar";
import PopUp from "@/components/PopUp";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function BaseLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const popupState = location.state?.popup;
  const popup = {
    open: Boolean(popupState),
    title: popupState?.title || "",
    description: popupState?.description || "",
    type: popupState?.type || "success",
    duration: popupState?.duration || 3000,
  };

  return (
    <SidebarProvider>
      <PopUp
        open={popup.open}
        title={popup.title}
        description={popup.description}
        type={popup.type}
        duration={popup.duration}
        actionLabel="Tutup"
        onClose={() => navigate(location.pathname, { replace: true, state: null })}
      />
      <AppSidebar />
      <main className="p-5 pb-20 md:pt-15 md:pb-20 md:px-10 w-full overflow-x-hidden relative">
        <SidebarTrigger className="flex lg:hidden fixed top-4 left-4 z-10 p-4 bg-background border border-input" />
        <Outlet />
        <AiChatWidget />
      </main>
    </SidebarProvider>
  );
}
