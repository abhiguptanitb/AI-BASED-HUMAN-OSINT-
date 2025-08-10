import { motion } from "framer-motion";

export default function Dashboard() {
  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div className="p-6 flex-1 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen overflow-y-auto">
      {/* Page Title */}
      <motion.h2
        className="text-3xl font-extrabold text-gray-800 mb-6 tracking-wide"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        DASHBOARD OVERVIEW
      </motion.h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Total Profiles", value: "256", color: "text-blue-600" },
          { title: "High Risk Profiles", value: "32", color: "text-red-500" },
          { title: "Reports Generated", value: "120", color: "text-green-500" },
        ].map((stat, i) => (
          <motion.div
            key={stat.title}
            className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={i}
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-gray-500 uppercase text-sm tracking-wide">
              {stat.title}
            </h3>
            <p className={`text-4xl font-bold mt-2 ${stat.color}`}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6 mt-8 border border-gray-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <h3 className="mb-4 font-semibold text-lg text-gray-700 border-b pb-2">
          Recent Activity
        </h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-600">
          <li>
            <span className="font-medium text-blue-600">Raj Kumar</span> updated
            - Sep 12, 2025
          </li>
          <li>
            New profile{" "}
            <span className="font-medium text-blue-600">Anjali Sharma</span>{" "}
            added - Sep 10, 2025
          </li>
          <li>
            Generated report for{" "}
            <span className="font-medium text-blue-600">Sunil Gupta</span> - Sep
            8, 2025
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
