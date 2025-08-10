import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Layout() {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      {!hideSidebar && (
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
          className="fixed top-0 left-0 h-screen w-64 z-30"
        >
          <Sidebar />
        </motion.div>
      )}

      {/* Main content */}
      <motion.main
        key={location.pathname} // animate page change
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`flex-1 p-4 lg:p-6 overflow-y-auto transition-all duration-300 
          ${!hideSidebar ? "lg:ml-64" : ""}`}
        style={{ scrollBehavior: "smooth" }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
