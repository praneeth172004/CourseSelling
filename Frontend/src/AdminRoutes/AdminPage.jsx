import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/boyseeing.png";

export default function AdminPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full relative">
      {/* Background Image */}
      <img src={image} alt="" className="w-full h-full object-cover absolute z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="bg-amber-100 p-2 rounded-2xl">
        <h1 className="text-3xl font-bold mb-8 ml-8">Admin Dashboard</h1>
        <div className="space-x-6">
          <button
            className="border-2 px-6 py-3 rounded-3xl text-lg font-medium hover:bg-black hover:text-white transition"
            onClick={() => navigate("/admin/courses")}
          >
            Show Courses
          </button>
          <button
            className="border-2 px-6 py-3 rounded-3xl text-lg font-medium hover:bg-black hover:text-white transition"
            onClick={() => navigate("/admin/createcourse")}
          >
            Add Courses
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
