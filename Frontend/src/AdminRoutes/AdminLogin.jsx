import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Make sure you have react-router-dom installed

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:2004/admin/login", {
        username,
        password
      }, {
        withCredentials: true 
      });

      setMessage(response.data.msg);

      if (response.status === 200 && response.data.msg === "Signin Successful") {
        console.log("Logged in successfully!");
        navigate("/admin/adminpage"); 
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setMessage(error.response.data.msg); 
      } else {
        setMessage("Login failed. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="h-screen bg-black flex flex-col justify-center items-center space-y-4">
      <div className="text-2xl text-white mb-4">Admin Login</div>
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
        onClick={handleLogin}
      >
        Login
      </button>
      {message && <div className="text-white mt-4">{message}</div>}
      
    </div>
  );
}

export default Login;
