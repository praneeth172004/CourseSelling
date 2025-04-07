const express = require("express");

const route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminauth = require("../middleware/adminauth");
const { AdminModel, CourseModel } = require("../Database/admindb");


// Sign-up Route
route.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) return res.status(400).json({ msg: "Enter Signup Details" });

    const existingUser = await AdminModel.findOne({ username });
    if (existingUser) return res.status(409).json({ msg: "User Already Exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await AdminModel.create({ username, password: hashedPassword });

    res.status(201).json({ msg: "User Created Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error: " + err.message });
  }
});

// Login Route
route.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ msg: "Provide Username and Password" });

    const admin = await AdminModel.findOne({ username });
    if (!admin) return res.status(401).json({ msg: "Incorrect Credentials" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ msg: "Incorrect Credentials" });

    const token = jwt.sign({ id: admin._id.toString() }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({ msg: "Signin Successful" });
  } catch (err) {
    res.status(500).json({ msg: "Signin Error: " + err.message });
  }
});


route.use(adminauth);
route.get("/home", async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.adminid);
    if (!admin) return res.status(404).json({ msg: "User not found." });

    res.json({ username: admin.username });
  } catch (err) {
    res.status(500).json({ msg: "Server Error." });
  }
});

// Course Creation Route
route.post("/createcourse", async (req, res) => {
  const { Coursetitle, CourseDescription, CoursePrice, Published,CourseImage } = req.body;
  console.log(Coursetitle, CourseDescription, CoursePrice, Published,CourseImage);
  const adminid=req.adminid;
  try {
    if (!Coursetitle || CoursePrice === "" || Published === null || Published === undefined) {
      return res.status(400).json({ msg: "Required Fields Not Entered" });
    }

    const data = await CourseModel.create({
      adminid:adminid,
      Coursetitle,
      CourseDescription,
      CourseImage,
      CoursePrice,
      Published
    });

    res.json({ 
      data,
      msg: "Course Created Successfully"
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error: " + err.message });
  }
});


// Course Update Route (Template)
route.put("/updatecourse/:id", async (req, res) => {
  try {
    const courseId=req.params.id;
    const {updatedData } = req.body;
    

    const updatedCourse = await CourseModel.findByIdAndUpdate(courseId, updatedData, { new: true });

    if (!updatedCourse) return res.status(404).json({ msg: "Course not found" });

    res.json({ msg: "Course Updated Successfully", course: updatedCourse });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error: " + err.message });
  }
});

route.get("/courses", async (req, res) => {
  try {
    const adminid = req.adminid; // Ensure this is being properly set (e.g., from middleware)
    console.log(adminid)
    if (!adminid) {
      return res.status(400).json({ msg: "Admin ID is required" });
    }

    const data = await CourseModel.find({ adminid} ); // Assuming you're fetching all courses related to an admin

    res.json({
      data: data// Send the entire list of courses
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      msg: "Internal Server Issue"
    });
  }
});

route.get("/adminprofile",async(req,res)=>{
  try{
    const adminid=req.adminid;
    if(!adminid){
      res.json({
        msg:"The Admin ID is not provided"
      })
    }
    const data=await AdminModel.findById(adminid);
    if(!data){
      res.json({
        msg:"Admin id is not Found"
      })
    }else{
      res.json({
        data
      })
    }
    console.log(data);
  }catch(err){
    res.json({
      msg:"Admin Profile Error"+err
    })
  }
})

module.exports = route;
