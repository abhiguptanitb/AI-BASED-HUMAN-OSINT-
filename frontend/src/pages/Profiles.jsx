import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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

export default function Profiles() {
  return (
    <div className="p-6 flex-1">
      <h2 className="text-2xl font-semibold mb-4">Raj Kumar</h2>
      <div className="grid grid-cols-3 gap-6">
        
        {/* Chart */}
        <div className="col-span-2 bg-white shadow p-4 rounded-lg">
          <h3 className="mb-2 font-medium">Profile Timeline</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={timelineData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Score */}
        <div className="bg-white shadow p-4 rounded-lg text-center">
          <h3 className="mb-2 font-medium">Risk Score</h3>
          <div className="text-4xl font-bold text-red-500">7.5</div>
          <div className="text-red-500 font-semibold">High Risk</div>
        </div>
      </div>

      {/* Connections */}
      <div className="bg-white shadow p-4 rounded-lg mt-6">
        <h3 className="mb-2 font-medium">Connections</h3>
        <p className="text-gray-500">Graph component can be implemented here</p>
      </div>

      {/* Recent Mentions */}
      <div className="bg-white shadow p-4 rounded-lg mt-6">
        <h3 className="mb-2 font-medium">Recent Mentions</h3>
        <ul className="list-disc ml-4">
          <li>Raj Kumar linked to fraud case - The Times of India (2023-11-15)</li>
          <li>Raj Kumar mentions in government report - Economic Times (2025-09-12)</li>
          <li>Raj Kumar on social media - Twitter (2023-07-05)</li>
        </ul>
      </div>
    </div>
  );
}
