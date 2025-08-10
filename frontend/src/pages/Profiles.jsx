import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const timelineData = [
  { month: "Jan", value: 3 },
  { month: "Feb", value: 7 },
  { month: "Mar", value: 7 },
  { month: "Apr", value: 12 },
  { month: "May", value: 9 },
  { month: "Jun", value: 13 },
  { month: "Jul", value: 6 },
  { month: "Aug", value: 17 },
  { month: "Sep", value: 10 },
  { month: "Oct", value: 8 },
  { month: "Nov", value: 6 },
  { month: "Dec", value: 5 },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Profiles() {
  return (
    <motion.div
      className="p-4 sm:p-6 flex-1 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.15 } },
      }}
    >
      {/* Title */}
      <motion.h2
        className="text-2xl sm:text-3xl font-bold mb-6 tracking-wide text-gray-800"
        variants={fadeInUp}
      >
        RAJ KUMAR
      </motion.h2>

      {/* Chart + Risk Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div
          className="lg:col-span-2 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 p-6 rounded-2xl transform hover:-translate-y-1"
          variants={fadeInUp}
        >
          <h3 className="mb-4 font-semibold uppercase text-gray-700 tracking-wider">
            Profile Timeline
          </h3>
          <div className="w-full h-48 sm:h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "0.5rem",
                    borderColor: "#e5e7eb",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="url(#colorGradient)"
                  strokeWidth={3}
                  activeDot={{ r: 6, fill: "#4f46e5" }}
                  dot={{ r: 4, fill: "#4f46e5" }}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Risk Score */}
        <motion.div
          className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 p-6 rounded-2xl text-center transform hover:-translate-y-1"
          variants={fadeInUp}
        >
          <h3 className="mb-4 font-semibold uppercase text-gray-700 tracking-wider">
            Risk Score
          </h3>
          <div className="text-4xl sm:text-5xl font-extrabold text-red-500 animate-pulse">
            7.5
          </div>
          <div className="text-red-500 font-semibold mt-2">High Risk</div>
        </motion.div>
      </div>

      {/* Connections */}
      <motion.div
        className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 p-6 rounded-2xl mt-6 transform hover:-translate-y-1"
        variants={fadeInUp}
      >
        <h3 className="mb-4 font-semibold uppercase text-gray-700 tracking-wider">
          Connections
        </h3>
        <p className="text-gray-500">Graph component can be implemented here</p>
      </motion.div>

      {/* Recent Mentions */}
      <motion.div
        className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 p-6 rounded-2xl mt-6 transform hover:-translate-y-1"
        variants={fadeInUp}
      >
        <h3 className="mb-4 font-semibold uppercase text-gray-700 tracking-wider">
          Recent Mentions
        </h3>
        <ul className="list-disc ml-4 space-y-2 text-gray-600">
          {[
            "Raj Kumar linked to fraud case - The Times of India (2023-11-15)",
            "Raj Kumar mentioned in government report - Economic Times (2025-09-12)",
            "Raj Kumar on social media - Twitter (2023-07-05)",
            "Raj Kumar linked to fraud case - The Times of India (2023-11-15)",
            "Raj Kumar mentioned in government report - Economic Times (2025-09-12)",
            "Raj Kumar on social media - Twitter (2023-07-05)",
            "Raj Kumar linked to fraud case - The Times of India (2023-11-15)",
            "Raj Kumar mentioned in government report - Economic Times (2025-09-12)",
            "Raj Kumar on social media - Twitter (2023-07-05)",
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
