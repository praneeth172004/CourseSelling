import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserProfile() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const response = await axios.get('http://localhost:2004/user/purchasedcourses', {
          withCredentials: true
        });
        console.log(response.data.data);
        
        setPurchasedCourses(response.data.data);
      } catch (err) {
        console.error("Error fetching purchased courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, []);

  return (
    <div className="w-full flex items-center justify-center bg-gray-100 p-4 min-h-screen">
      <div className="p-6 rounded-lg shadow-lg max-w-4xl w-full bg-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Purchased Courses</h1>

        {loading ? (
          <p className="text-center text-lg">Loading your purchased courses...</p>
        ) : purchasedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {purchasedCourses.map((course, index) => (
              <div key={index} className="p-4 border rounded shadow-md bg-white bg-opacity-90">
                <p className="font-bold text-lg mb-1">{course.Coursetitle}</p>
                <p className="mb-2 text-gray-700">{course.CourseDescription || "No Description"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">You haven't purchased any courses yet.</p>
        )}
      </div>
    </div>
  );
}

