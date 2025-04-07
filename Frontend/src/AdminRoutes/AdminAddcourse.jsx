import axios from "axios";
import React, { useState } from "react";

export default function AdminAddcourse() {
  const [coursetitle, setcoursetitle] = useState("");
  const [coursedescription, setcoursedescription] = useState("");
  const [courseprice, setcourseprice] = useState("");
  const [publish, setpublish] = useState(false);
  const [message, setMessage] = useState("");

  async function handleclick() {
    try {
      const response = await axios.post("http://localhost:2004/admin/createcourse", {
          Coursetitle: coursetitle,
          CourseDescription: coursedescription,
          CoursePrice: parseFloat(courseprice), // Ensure it's a number
          Published: publish
        },
        { withCredentials: true }
      );

      setMessage(response.data.msg);

      if (response.status === 200 && response.data.msg === "Course Created Successfully") {
        console.log("Course Created Successfully");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setMessage(error.response.data.msg);
      } else {
        setMessage("Creation failed. Please try again.");
      }
      console.error(error);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-cyan-500">
      <div>
       <p className="text-8xl mb-8"> Course Adding </p> 
        <div className="border-2 p-5 mb-8">
          <div className="flex flex-col space-y-2 ">
            <input
              type="text"
              className="border-2 p-2"
              placeholder="Enter Title"
              onChange={(e) => setcoursetitle(e.target.value)}
            />
            <input
              type="text"
              className="border-2 p-2"
              placeholder="Enter Description"
              onChange={(e) => setcoursedescription(e.target.value)}
            />
            <input
              type="number"
              className="border-2  p-2"
              placeholder="Enter Price"
              onChange={(e) => setcourseprice(e.target.value)}
            />
            <div className="flex justify-center">
              <input type="checkbox" onChange={() => setpublish(!publish)} />
              <label>Publish</label>
            </div>
            <button className="border-2" onClick={handleclick}>
              Add Course
            </button>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
