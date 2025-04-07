import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function AdminCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function Coursedata() {
      try {
        const response = await axios.get("http://localhost:2004/admin/courses", {
          withCredentials: true,
        });
        setCourses(response.data.data); // Assuming the API returns { data: [...] }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    Coursedata();
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center ">
      {/* Background Image */}
     

      {/* Content */}
      <div className=" p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-10 ">
        <h1 className="text-2xl font-bold mb-6 text-center">Courses List</h1>

        {loading ? (
          <p className="text-center text-lg">Loading courses...</p>
        ) : courses && courses.length > 0 ? (
          <ul className="space-y-4">
            {courses.map((course, index) => (
              <li key={index} className="p-4 border rounded shadow-md bg-white bg-opacity-90">
                <p><strong>Title:</strong> {course.Coursetitle}</p>
                <p><strong>Description:</strong> {course.CourseDescription || "No Description"}</p>
                <p><strong>Price:</strong> ₹{course.CoursePrice}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg">No courses found.</p>
        )}

        {/* Back Button */}
        <div className="flex justify-center mt-8">
          <button
            className="border-2 px-5 py-2 rounded-2xl hover:bg-black hover:text-white text-xl transition"
            onClick={() => navigate("/admin/adminpage")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
