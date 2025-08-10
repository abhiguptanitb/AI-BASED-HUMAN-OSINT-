import { useState } from "react";
import { motion } from "framer-motion";

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoLogout: 15, // minutes
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAutoLogoutChange = (e) => {
    setSettings((prev) => ({ ...prev, autoLogout: e.target.value }));
  };

  return (
    <motion.div
      className="p-6 flex-1 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen overflow-y-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 tracking-wide">
        Settings
      </h2>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 max-w-md">
        {/* Notifications */}
        <div className="flex items-center justify-between mb-6">
          <label className="font-semibold text-gray-700">Notifications</label>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={() => handleToggle("notifications")}
            className="w-5 h-5 cursor-pointer accent-blue-600"
          />
        </div>

        {/* Dark Mode */}
        <div className="flex items-center justify-between mb-6">
          <label className="font-semibold text-gray-700">Dark Mode</label>
          <input
            type="checkbox"
            checked={settings.darkMode}
            onChange={() => handleToggle("darkMode")}
            className="w-5 h-5 cursor-pointer accent-purple-600"
          />
        </div>

        {/* Auto Logout */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">
            Auto Logout (minutes)
          </label>
          <input
            type="number"
            min={1}
            max={60}
            value={settings.autoLogout}
            onChange={handleAutoLogoutChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
          />
        </div>

        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-6 rounded-lg shadow-md hover:opacity-90 transition"
          onClick={() => alert("Settings saved!")}
        >
          Save Settings
        </button>
      </div>
    </motion.div>
  );
}
