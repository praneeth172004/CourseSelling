import React from 'react';
import userImage from '../assets/userpage.png';
import { useNavigate } from 'react-router-dom';

export default function Landingpage() {
  const navigate=useNavigate();
  return (
    <div className=" h-screen overflow-hidden">
      {/* Background Image */}
      <img 
        src={userImage} 
        alt="courseselling" 
        className="w-full h-full object-cover"
      />

      {/* Centered Button */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <button
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-xl hover:bg-indigo-700 transition duration-300"
          onClick={()=>navigate("/user/courses")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
