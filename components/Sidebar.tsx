"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

// Define the links structure
const links = [
  { label: "Lawyers", href: "/lawyers", icon: <img src="/icons/lawyericon.png" alt="Lawyers" className="w-5 h-5" /> },
  { label: "Offices", href: "/offices", icon: <img src="/icons/office.png" alt="Offices" className="w-5 h-5" /> },
  { label: "My Notifications", href: "/notifications", icon: <img src="/icons/notifications.png" alt="Notifications" className="w-5 h-5" /> },
  { label: "My Bookings", href: "/bookings", icon: <img src="/icons/booking.png" alt="Bookings" className="w-5 h-5" /> },
  { label: "My Cases", href: "/cases", icon: <img src="/icons/case.png" alt="Cases" className="w-5 h-5" /> },
  { label: "My Chat", href: "/chat", icon: <img src="/icons/chat.png" alt="Chat" className="w-5 h-5" /> },
  { label: "Dashboard", href: "/dashboard", icon: <img src="/icons/dashboard.png" alt="Dashboard" className="w-5 h-5" /> },
  { label: "Settings", href: "/settings", icon: <img src="/icons/settings.png" alt="Settings" className="w-5 h-5" /> },
  { label: "Docs", href: "/docs", icon: <img src="/icons/docs.png" alt="Docs" className="w-5 h-5" /> },
  { label: "FAQ", href: "/faq", icon: <img src="/icons/FAQ.png" alt="FAQ" className="w-5 h-5" /> },
  { label: "Bookmarks", href: "/bookmarks", icon: <img src="/icons/bookmark.png" alt="Bookmarks" className="w-5 h-5" /> },
  { label: "Sign Out", href: "/signout", icon: <img src="/icons/signout.png" alt="Sign Out" className="w-5 h-5" /> },
];

// Sidebar Context and Provider
interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({ children, open: openProp, setOpen: setOpenProp, animate = true }: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);
  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};
export const SidebarBody = () => {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};
// Sidebar Component
export const Sidebar = ({ children, open, setOpen, animate }: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};
// Desktop Sidebar
export const DesktopSidebar = ({ className, ...props }: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  
  return (
    <motion.div
      className={cn("h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] flex-shrink-0", className)}
      animate={{ width: animate ? (open ? "300px" : "60px") : "300px" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {/* User Profile */}
      <div className="flex items-center mb-6">
        <div className="relative mr-4">
          <img 
            src="/icons/profile.png" 
            alt="User Profile" 
            className={cn("rounded-full transition-all duration-300", open ? "w-12 h-12" : "w-10 h-10")} // Adjust size
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border border-neutral-100 rounded-full"></span>
        </div>
        {open && ( // Show details only when the sidebar is open
          <div>
            <p className="font-bold text-lg">Full User Name</p>
            <p className="text-gray-600 text-sm">@username</p>
          </div>
        )}
      </div>
      <hr className="border-gray-400 mb-4" />

      {/* Navigation Links */}
      <div className="flex flex-col space-y-6 flex-grow">
        {links.map((link) => (
          <SidebarLink key={link.label} link={link} />
        ))}
      </div>
    </motion.div>
  );
};;

// Sidebar Link Component
export const SidebarLink = ({ link }: { link: { label: string; href: string; icon: React.ReactNode } }) => {
  const { open } = useSidebar();
  return (
    <Link href={link.href} className="flex items-center justify-start gap-2 py-2 group">
      {link.icon}
      <motion.span
        animate={{
          display: open ? "inline-block" : "none",
          opacity: open ? 1 : 0,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm transition duration-150 whitespace-pre"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};

// Mobile Sidebar
export const MobileSidebar = ({ className, children, ...props }: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <div className={cn("h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full", className)} {...props}>
      <div className="flex justify-end z-20 w-full">
        <IconMenu2 className="text-neutral-800 dark:text-neutral-200" onClick={() => setOpen(!open)} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between"
          >
            <div className="absolute right-10 top-10 z-50" onClick={() => setOpen(!open)}>
              <IconX />
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};