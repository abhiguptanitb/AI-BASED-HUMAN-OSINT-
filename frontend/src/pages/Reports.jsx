export default function Reports() {
  const reports = [
    { id: 1, name: "Raj Kumar", date: "2025-09-12", type: "Full OSINT Report" },
    { id: 2, name: "Anjali Sharma", date: "2025-09-10", type: "Activity Summary" },
    { id: 3, name: "Sunil Gupta", date: "2025-09-08", type: "Connections Report" },
  ];

  return (
    <div className="p-6 flex-1">
      <h2 className="text-2xl font-semibold mb-4">Generated Reports</h2>

      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Profile Name</th>
              <th className="py-2">Date</th>
              <th className="py-2">Report Type</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{report.name}</td>
                <td className="py-2">{report.date}</td>
                <td className="py-2">{report.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
