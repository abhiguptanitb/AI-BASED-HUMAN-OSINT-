import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Jan", value: 5 },
  { date: "Feb", value: 8 },
  { date: "Mar", value: 6 },
  { date: "Apr", value: 12 },
  { date: "May", value: 9 },
  { date: "Jun", value: 14 },
  { date: "Jul", value: 10 },
  { date: "Aug", value: 15 },
  { date: "Sep", value: 13 },
];

export default function DataSourceInsights() {
  return (
    <motion.div
      className="p-6 flex-1 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen overflow-y-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 tracking-wide">
        Data Source Insights
      </h2>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 max-w-4xl mx-auto">
        <h3 className="mb-4 font-semibold uppercase text-gray-700 tracking-wider">
          Data Trends Over Time
        </h3>
        <div className="w-full h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" stroke="#6b7280" />
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
      </div>
    </motion.div>
  );
}
