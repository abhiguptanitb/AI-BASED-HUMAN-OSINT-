import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, User, Search, FileText, LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/" },
    { name: "Profiles", icon: <User size={20} />, path: "/profiles" },
    { name: "Search", icon: <Search size={20} />, path: "/search" },
    { name: "Reports", icon: <FileText size={20} />, path: "/reports" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md p-4 fixed top-0 left-0 w-full z-40">
        <h1 className="text-lg font-extrabold tracking-widest">OSINT</h1>
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="p-2 rounded-md hover:bg-blue-500 active:scale-95 transition"
          >
            <Menu size={24} />
          </button>
        )}
      </div>

      {/* Desktop Sidebar (always visible) */}
      <div className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-blue-700 to-purple-700 text-white shadow-lg flex-col justify-between p-4 z-50">
        {/* Top Section */}
        <div>
          <h1 className="text-2xl font-extrabold tracking-widest mb-8">OSINT</h1>
          <nav className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition transform hover:scale-[1.02] hover:shadow-lg ${
                  location.pathname === link.path
                    ? "bg-white text-blue-700 font-semibold shadow-md"
                    : "hover:bg-blue-600"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 mt-4 bg-red-500 hover:bg-red-600 active:scale-95 text-white rounded-lg shadow-md transition w-full"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* Mobile Sidebar (slide in/out) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.div
              className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-blue-700 to-purple-700 text-white shadow-lg flex flex-col justify-between p-4 z-50"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Top */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-2xl font-extrabold tracking-widest">OSINT</h1>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    className="p-2 hover:bg-blue-600 rounded-full transition"
                  >
                    <X size={24} />
                  </button>
                </div>
                <nav className="space-y-2">
                  {links.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`flex items-center gap-3 p-3 rounded-lg transition transform hover:scale-[1.02] hover:shadow-lg ${
                        location.pathname === link.path
                          ? "bg-white text-blue-700 font-semibold shadow-md"
                          : "hover:bg-blue-600"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Logout */}
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 p-3 mt-4 bg-red-500 hover:bg-red-600 active:scale-95 text-white rounded-lg shadow-md transition w-full"
              >
                <LogOut size={20} />
                Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
