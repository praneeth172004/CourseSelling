const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true, // ✅ Fixed typo (unique instead of Unique)
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const adminCourseSchema = new mongoose.Schema({
    adminid:{
        type:mongoose.Types.ObjectId,
        ref:"Admin"
    },
    Coursetitle: {
        type: String,
        required: true
    },
    CourseDescription: {
        type: String
    },
    CoursePrice: {
        type: Number,
        required: true
    },
    CourseImage: {
        type: String
    },
    Published: {
        type: Boolean,
        required: true
    }
});

const AdminModel = mongoose.model("Admin", adminSchema); 
const CourseModel = mongoose.model("AdminCourse", adminCourseSchema);

module.exports = { AdminModel, CourseModel };
