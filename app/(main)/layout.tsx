'use client'
import React, { useState } from "react";
import { Sidebar, SidebarBody } from "../../components/Sidebar"; // Adjust the import path based on your project structure

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to control sidebar visibility

  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
        <SidebarBody />
      </Sidebar>

      {/* Main content */}
      <main className="flex-1 p-4 overflow-y-auto bg-white min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;