import { Link, useLocation } from "react-router-dom";
import { Home, User, Search, FileText } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const links = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/" },
    { name: "Profiles", icon: <User size={20} />, path: "/profiles" },
    { name: "Search", icon: <Search size={20} />, path: "/search" },
    { name: "Reports", icon: <FileText size={20} />, path: "/reports" },
  ];

  return (
    <div className="bg-white shadow-md w-60 h-screen p-4">
      <h1 className="text-xl font-bold mb-6">OSINT Profile Dashboard</h1>
      <nav>
        {links.map(link => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 
              ${location.pathname === link.path ? "bg-gray-200 font-semibold" : ""}`}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
