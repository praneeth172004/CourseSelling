import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./UserRoutes/Signup";
import Login from "./UserRoutes/Login";
import Home from "./UserRoutes/Profile";
import FirstPage from "./UserRoutes/FirstPage";
import Landingpage from "./UserRoutes/Landingpage";
import AdminLogin from "./AdminRoutes/AdminLogin";
import AdminSignup from "./AdminRoutes/AdminSignup"
import AdminAddcourse from "./AdminRoutes/AdminAddcourse";
import AdminPage from "./AdminRoutes/AdminPage";
import AdminCourse from "./AdminRoutes/AdminCourse"
import Courses from "./UserRoutes/Courses"
import UserProfile from "./UserRoutes/UserProfile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage />}></Route>
          <Route path="/user/signup" element={<Signup/>}></Route>
          <Route path="/user/login" element={<Login />}></Route>
          <Route path="/user/landing" element={<Landingpage/>}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/admin/login" element={<AdminLogin/>}></Route>
          <Route path="/admin/signup" element={<AdminSignup/>}></Route>
          <Route path="/admin/createcourse" element={<AdminAddcourse/>}></Route>
          <Route path="/admin/adminpage" element={<AdminPage/>}></Route>
          <Route path="/admin/courses" element={<AdminCourse/>}></Route>
          <Route path="/user/courses" element={<Courses/>}></Route>
          <Route path="/user/profile" element={<UserProfile/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
