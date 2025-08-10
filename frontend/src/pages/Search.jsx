import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Simulate an API call delay for animation effect
    setTimeout(() => {
      setResults([
        { name: "Raj Kumar", risk: "High", score: 7.5 },
        { name: "Anjali Sharma", risk: "Low", score: 3.1 },
      ]);
    }, 300);
  };

  return (
    <div className="p-4 sm:p-6 flex-1">
      {/* Gradient Title */}
      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl sm:text-3xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        SEARCH PROFILES
      </motion.h2>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        <input
          type="text"
          placeholder="Enter profile name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg w-full sm:w-auto font-medium shadow-md hover:shadow-lg active:scale-95 transform transition-all duration-200"
        >
          Search
        </button>
      </motion.div>

      {/* Results */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-lg rounded-xl p-4 overflow-x-auto border border-gray-100"
          >
            <h3 className="mb-3 font-semibold text-gray-700">Results</h3>
            <table className="w-full min-w-[400px] text-left border-collapse">
              <thead>
                <tr className="border-b bg-gray-100">
                  <th className="py-3 px-3">Name</th>
                  <th className="py-3 px-3">Risk</th>
                  <th className="py-3 px-3">Score</th>
                </tr>
              </thead>
              <tbody>
                {results.map((profile, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-3">{profile.name}</td>
                    <td
                      className={`py-3 px-3 font-semibold ${
                        profile.risk === "High"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {profile.risk}
                    </td>
                    <td className="py-3 px-3">{profile.score}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
