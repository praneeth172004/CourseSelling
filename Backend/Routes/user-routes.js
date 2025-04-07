const express = require("express");
const { Usermodel, UserPurchased } = require("../Database/db");
const route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { CourseModel } = require("../Database/admindb");

// Sign-up Route
route.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) return res.status(400).json({ msg: "Enter Signup Details" });

    const existingUser = await Usermodel.findOne({ username });
    if (existingUser) res.status(409).json({ msg: "User Already Exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await Usermodel.create({ username, password: hashedPassword });

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

    const user = await Usermodel.findOne({ username });
    if (!user) return res.status(401).json({ msg: "Incorrect Credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Incorrect Credentials" });

    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "1d" });

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

route.use(auth);
route.get("/home", async (req, res) => {
  try {
    const user = await Usermodel.findById(req.userid);
    if (!user) return res.status(404).json({ msg: "User not found." });

    res.json({ username: user.username });
  } catch (err) {
    res.status(500).json({ msg: "Server Error." });
  }
});

route.get("/courses",async (req,res)=>{
  try{
   const data=await CourseModel.find({});
   if(!data){
    res.json({
      msg:"NO data is Found"
    })
   }
   res.json({
    data:data
   })
  }catch(err){
    res.json({
      msg:"Courses Error"+err
    })
  }
})

route.get("/purchasedcourse/:id", async (req, res) => {
  const courseid = req.params.id;
  const userid = req.userid;

  try {
    // Step 1: Validate user ID
    if (!userid) {
      return res.status(401).json({
        msg: "Unauthorized: User ID not found.",
      });
    }

    // Step 2: Check if course exists
    const course = await CourseModel.findById(courseid);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    // Step 3: Check if already purchased
    const alreadyPurchased = await UserPurchased.findOne({ courseid, userid });

    if (alreadyPurchased) {
      return res.status(200).json({ msg: "Course already purchased" });
    }

    // Step 4: Purchase and save course
    const purchase = await UserPurchased.create({
      adminid: course.adminid,
      userid,
      courseid,
      Coursetitle: course.Coursetitle,
      CourseDescription: course.CourseDescription,
      CoursePrice: course.CoursePrice,
      CourseImage: course.CourseImage,
    });

    return res.status(201).json({
      msg: "Course purchased successfully",
      purchasedCourse: purchase,
    });

  } catch (err) {
    return res.status(500).json({
      Error: "Course related Issue: " + err.message,
    });
  }
});


route.get("/purchasedcourses", async (req, res) => {
  try {
    const userId = req.userid; // Ensure this is correctly extracted from your authentication middleware

    // Find all purchased courses by the user
    console.log(userId);
    
    const purchasedCourses = await UserPurchased.find({ "userid": userId });
    console.log(purchasedCourses);
    

    if (!purchasedCourses || purchasedCourses.length === 0) {
      return res.status(404).json({ msg: "No purchased courses found" });
    }

    res.json({ data: purchasedCourses });
  } catch (err) {
    res.status(500).json({ Error: "Failed to fetch purchased courses: " + err.message });
  }
});


module.exports = route;
