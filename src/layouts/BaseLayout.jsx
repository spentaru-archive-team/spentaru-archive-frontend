import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router";

export default function BaseLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-5 md:p-10 w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
