import { motion } from "framer-motion";

const timelineEvents = [
  { date: "2025-09-12", description: "Updated profile information" },
  { date: "2025-09-10", description: "New report generated" },
  { date: "2025-09-08", description: "Profile connected with Sunil Gupta" },
];

export default function Timeline() {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ staggerChildren: 0.15 }}
    >
      <h3 className="mb-4 font-semibold uppercase text-gray-700 tracking-wider">
        Timeline
      </h3>
      <ul className="space-y-3 text-gray-600">
        {timelineEvents.map((event, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15 }}
            className="relative pl-5 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-blue-600"
          >
            <span className="font-semibold text-gray-800">{event.date}:</span>{" "}
            {event.description}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
