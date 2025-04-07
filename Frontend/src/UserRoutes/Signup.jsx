import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      console.log(username)
      console.log(password);
            
      const response = await axios.post("http://localhost:2004/user/signup", {
        username,
        password
      }, {
        withCredentials: true
      });

      console.log(response.data.msg);
      setMessage(response.data.msg);

      // Redirect to login page on successful signup
      if (response.status === 201) {
        setTimeout(() => navigate("/user/login"), 2000);
      }

    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage("User Already Exists. Please try a different username.");
      } else if (error.response && error.response.status === 400) {
        setMessage("Please enter all the required details.");
      } else {
        setMessage("Signup failed. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="h-screen bg-black flex flex-col justify-center items-center space-y-4">
      <div className="text-2xl text-white mb-4"> User Sign up</div>
      <input 
        type="text" 
        className="bg-white rounded-xl p-2 w-72 placeholder:pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input 
        type="password" 
        className="bg-white rounded-xl p-2 w-72 placeholder:pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500"  
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button 
        className="bg-blue-500 text-white rounded-xl p-2 w-72 hover:bg-blue-600 transition"
        onClick={handleSignup}
      >
        Sign Up
      </button>
      {message && <div className="text-white mt-4">{message}</div>}
      <button 
        className="bg-green-500 text-white rounded-xl p-2 w-72 hover:bg-green-600 transition mt-4"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </div>
  );
}

export default Signup;
