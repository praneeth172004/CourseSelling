import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function FirstPage() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);

  function handleclick(role) {
    setSelectedRole(role);
    setToggle(true);
  }

  function handleNavigation(action) {
    setLoading(true);
    const routePath = `/${selectedRole}/${action}`; // Dynamic route based on role and action
    setTimeout(() => {
      navigate(routePath);
      setLoading(false);
    }, 700); // Reduced delay for snappier navigation
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-900 via-purple-700 to-pink-600 w-full flex items-center justify-center relative">
      <AnimatePresence>
        {loading && (
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-20 h-20 border-4 border-t-transparent border-l-transparent border-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="text-center text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-8xl mb-12 font-extrabold tracking-wider drop-shadow-lg">Course Selling</div>

        <AnimatePresence>
          {toggle && (
            <motion.div
              className="flex justify-around mt-10"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <button
                className="text-3xl border-2 border-white rounded-full px-8 py-3 mx-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-xl transition-transform transform hover:scale-105"
                onClick={() => handleNavigation("signup")}
              >
                Signup
              </button>
              <button
                className="text-3xl border-2 border-white rounded-full px-8 py-3 mx-4 bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-indigo-600 hover:to-teal-600 shadow-xl transition-transform transform hover:scale-105"
                onClick={() => handleNavigation("login")}
              >
                Login
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-3xl mt-16 mb-6 drop-shadow-lg">Choose your Role</div>
        <div className="flex justify-around space-x-10 mt-5">
          <AnimatePresence>
            {(selectedRole === "" || selectedRole === "user") && (
              <motion.div
                className={`text-4xl border-4 p-6 rounded-full cursor-pointer shadow-2xl transition-all duration-200 ${
                  selectedRole === "user"
                    ? "bg-blue-500 text-white scale-105 shadow-blue-500/60"
                    : "bg-white text-blue-500 shadow-sm"
                }`}
                onClick={() => handleclick("user")}
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                User
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {(selectedRole === "" || selectedRole === "admin") && (
              <motion.div
                className={`text-4xl border-4 p-6 rounded-full cursor-pointer shadow-2xl transition-all duration-200 ${
                  selectedRole === "admin"
                    ? "bg-red-500 text-white scale-105 shadow-red-500/60"
                    : "bg-white text-red-500 shadow-sm"
                }`}
                onClick={() => handleclick("admin")}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 80 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                Admin
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
