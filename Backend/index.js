// app.js
const express = require("express");
const dot = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dot.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

const userRoutes = require("./Routes/user-routes"); 
const adminRoutes=require("./Routes/admin-routes") 
app.use("/user", userRoutes);  
app.use("/admin",adminRoutes)

const PORT = process.env.PORT || 2004;
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Mongoose Connected");
}).catch((err) => {
    console.log("Mongoose Connection Issue: " + err);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
