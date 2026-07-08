import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../organism/Sidebar";
import Header from "../organism/Header";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="bg-grey-light/30 flex min-h-screen flex-col">
      <Header
        isLogin={true}
        isDashboard={true}
        onOpenSidebar={() => setIsSidebarOpen(true)}
      />

      <div className="relative flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 bg-white p-6 md:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
