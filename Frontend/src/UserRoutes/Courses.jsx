import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null); // State for showing notification
  const navigate = useNavigate();

  useEffect(() => {
    async function Coursedata() {
      try {
        const response = await axios.get("http://localhost:2004/user/courses", {
          withCredentials: true,
        });
        setCourses(response.data.data); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    Coursedata();
  }, []);

  const handlePurchase = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:2004/user/purchasedcourse/${courseId}`,
        { withCredentials: true }
      );

      if (response.data.msg === "Course purchased successfully") {
        showNotification("Course purchased successfully!", "success");
      } else {
        showNotification(response.data.msg || "Failed to purchase course.", "error");
      }
    } catch (err) {
      console.error("Purchase Error:", err);
      showNotification("An error occurred during the purchase.", "error");
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });

    // Hide notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-100 p-4 min-h-screen">
      <div className="p-6 rounded-lg shadow-lg max-w-4xl w-full bg-white relative">

        {/* Notification Box */}
        {notification && (
          <div
            className={`fixed top-5 left-1/2 transform -translate-x-1/2 p-3 rounded-md shadow-lg text-white text-center z-50 
            ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}
          >
            {notification.message}
          </div>
        )}

        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Courses List</h1>

        {loading ? (
          <p className="text-center text-lg">Loading courses...</p>
        ) : courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <div key={index} className="p-4 border rounded shadow-md bg-white bg-opacity-90 flex flex-col justify-between">
                <div>
                  <p className="font-bold text-lg mb-1">{course.Coursetitle}</p>
                  <p className="mb-2 text-gray-700">{course.CourseDescription || "No Description"}</p>
                  <p className="mb-4 text-gray-800 font-semibold">Price: ₹{course.CoursePrice}</p>
                </div>
                <button 
                  className="border-2 rounded-xl p-2 w-fit bg-black text-white hover:bg-gray-800 transition"
                  onClick={() => handlePurchase(course._id)}
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">No courses found.</p>
        )}

        <div className="flex justify-center space-x-3 mt-8">
          <button
            className="border-2 px-5 py-2 rounded-2xl hover:bg-black hover:text-white text-xl transition"
            onClick={() => navigate("/user/landing")}
          >
            Back
          </button>
          <button
            className="border-2 px-5 py-2 rounded-2xl hover:bg-black hover:text-white text-xl transition"
            onClick={() => navigate("/user/profile")}
          >
            Purchesed Courses
          </button>
        </div>
       
      </div>
    </div>
  );
}
