export default function Reports() {
  const reports = [
    { id: 1, name: "Raj Kumar", date: "2025-09-12", type: "Full OSINT Report" },
    { id: 2, name: "Anjali Sharma", date: "2025-09-10", type: "Activity Summary" },
    { id: 3, name: "Sunil Gupta", date: "2025-09-08", type: "Connections Report" },
  ];

  return (
    <div className="p-4 sm:p-6 flex-1 animate-fadeIn">
      {/* Heading with animated gradient text */}
      <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradientMove">
        Generated Reports
      </h2>

      {/* Card container */}
      <div className="bg-white shadow-xl rounded-2xl p-4 overflow-x-auto border border-gray-200 transition-transform duration-300 hover:shadow-2xl">
        <table className="w-full min-w-[500px] text-left border-collapse">
          <thead>
            <tr className="border-b bg-gradient-to-r from-blue-100 to-purple-100 shadow-sm">
              <th className="py-3 px-4 font-semibold text-gray-700">Profile Name</th>
              <th className="py-3 px-4 font-semibold text-gray-700">Date</th>
              <th className="py-3 px-4 font-semibold text-gray-700">Report Type</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr
                key={report.id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="border-b hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 
                           transition-all duration-300 hover:scale-[1.01] hover:shadow-md"
              >
                <td className="py-3 px-4 font-medium text-gray-800">{report.name}</td>
                <td className="py-3 px-4 text-gray-600">{report.date}</td>
                <td className="py-3 px-4 text-gray-600">{report.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tailwind custom animations */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes gradientMove {
          0% { background-position: 0% center; }
          100% { background-position: -200% center; }
        }
        .animate-gradientMove {
          animation: gradientMove 4s ease infinite;
        }
      `}</style>
    </div>
  );
}
