const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});



const PurchasedSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  adminid: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  courseid: {
    type: mongoose.Types.ObjectId,
    ref: "AdminCourse",
    required: true,
  },
  Coursetitle: {
    type: String,
    required: true,
  },
  CourseDescription: {
    type: String,
    default: "No Description",
  },
  CourseImage: {
    type: String,
    default: "No Image",
  },
}, { timestamps: true });  // Adds `createdAt` and `updatedAt` fields

const UserPurchased= mongoose.model("UserPurchased", PurchasedSchema);


const Usermodel = mongoose.model("User", UserSchema);


module.exports = {
  Usermodel,
  UserPurchased
};
