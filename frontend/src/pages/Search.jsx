import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Sample mock results — replace with API call
    setResults([
      { name: "Raj Kumar", risk: "High", score: 7.5 },
      { name: "Anjali Sharma", risk: "Low", score: 3.1 },
    ]);
  };

  return (
    <div className="p-6 flex-1">
      <h2 className="text-2xl font-semibold mb-4">Search Profiles</h2>

      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter profile name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="mb-3 font-medium">Results</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">Name</th>
                <th className="py-2">Risk</th>
                <th className="py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {results.map((profile, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-2">{profile.name}</td>
                  <td
                    className={`py-2 font-medium ${
                      profile.risk === "High" ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {profile.risk}
                  </td>
                  <td className="py-2">{profile.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
