
import React from "react";
import Sidebar from "../../components/Sidebar"; // Adjust the import path based on your project structure

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-4 overflow-y-auto bg-white min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
