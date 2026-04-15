import AiChatWidget from "@/components/AiChatWidget";
import AppSidebar from "@/components/AppSidebar";
import PopUp from "@/components/PopUp";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function BaseLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [popup, setPopup] = useState({
    open: false,
    title: "",
    description: "",
    type: "success",
    duration: 3000,
  });

  useEffect(() => {
    const popupState = location.state?.popup;
    if (!popupState) return;

    setPopup({
      open: true,
      title: popupState.title,
      description: popupState.description,
      type: popupState.type || "success",
      duration: popupState.duration || 3000,
    });

    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  return (
    <SidebarProvider>
      <PopUp
        open={popup.open}
        title={popup.title}
        description={popup.description}
        type={popup.type}
        duration={popup.duration}
        actionLabel="Tutup"
        onClose={() =>
          setPopup((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
      <AppSidebar />
      <main className="p-5 md:py-15 md:px-10 w-full overflow-x-hidden relative">
        <SidebarTrigger className='absolute top-4 left-4 z-10 p-4 bg-background border border-input' />
        <Outlet />
        <AiChatWidget />
      </main>
    </SidebarProvider>
  );
}
