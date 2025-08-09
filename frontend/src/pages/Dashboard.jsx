export default function Dashboard() {
  return (
    <div className="p-6 flex-1">
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>

      <div className="grid grid-cols-3 gap-6">
        {/* Total Profiles */}
        <div className="bg-white shadow p-4 rounded-lg text-center">
          <h3 className="text-gray-500">Total Profiles</h3>
          <p className="text-4xl font-bold text-blue-600">256</p>
        </div>

        {/* High Risk Profiles */}
        <div className="bg-white shadow p-4 rounded-lg text-center">
          <h3 className="text-gray-500">High Risk Profiles</h3>
          <p className="text-4xl font-bold text-red-500">32</p>
        </div>

        {/* Reports Generated */}
        <div className="bg-white shadow p-4 rounded-lg text-center">
          <h3 className="text-gray-500">Reports Generated</h3>
          <p className="text-4xl font-bold text-green-500">120</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow p-4 rounded-lg mt-6">
        <h3 className="mb-3 font-medium">Recent Activity</h3>
        <ul className="list-disc ml-4">
          <li>Profile “Raj Kumar” updated - Sep 12, 2025</li>
          <li>New profile “Anjali Sharma” added - Sep 10, 2025</li>
          <li>Generated report for “Sunil Gupta” - Sep 8, 2025</li>
        </ul>
      </div>
    </div>
  );
}
