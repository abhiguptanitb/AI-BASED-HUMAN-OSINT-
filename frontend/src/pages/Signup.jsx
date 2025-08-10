import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup form submitted", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md transform transition-all hover:shadow-2xl"
      >
        {/* Branding */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-extrabold text-center mb-2 bg-gradient-to-r from-blue-600 via-purple-500 to-purple-700 bg-clip-text text-transparent animate-gradient-x"
        >
          OSINT
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800"
        >
          Create Your Account
        </motion.h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "password", "confirmPassword"].map((field, idx) => (
            <motion.input
              key={field}
              type={field.includes("password") ? "password" : field}
              name={field}
              placeholder={
                field === "confirmPassword"
                  ? "Confirm Password"
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              onChange={handleChange}
              required
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none text-sm sm:text-base transition-shadow hover:shadow-md"
            />
          ))}

          {/* Gradient Button */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 hover:shadow-lg transition-all text-sm sm:text-base font-semibold"
          >
            Sign Up
          </motion.button>
        </form>

        {/* Login Redirect */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-4 text-gray-600 text-sm sm:text-base"
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-purple-600 transition-colors font-medium"
          >
            Login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
