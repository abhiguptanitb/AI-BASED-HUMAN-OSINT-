import { motion } from "framer-motion";
import Timeline from "../components/Timeline";

export default function ProfileDetails() {
  const profile = {
    name: "Raj Kumar",
    email: "raj.kumar@example.com",
    phone: "+91 9876543210",
    address: "Bhopal, India",
    riskScore: 7.5,
    status: "High Risk",
    description:
      "Raj Kumar is a high-risk profile linked to multiple fraud investigations.",
  };

  return (
    <motion.div
      className="p-6 flex-1 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen overflow-y-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 tracking-wide">
        {profile.name}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Details Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Details</h3>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p className="mt-4">{profile.description}</p>
          <div className="mt-6 text-center">
            <span className="text-4xl font-extrabold text-red-500 animate-pulse">
              {profile.riskScore}
            </span>
            <div className="text-red-500 font-semibold">{profile.status}</div>
          </div>
        </div>

        {/* Timeline */}
        <Timeline />

        {/* Empty or future details */}
        <div />
      </div>
    </motion.div>
  );
}
