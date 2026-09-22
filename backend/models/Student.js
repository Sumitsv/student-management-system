const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required."],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters long."],
    },
    email: {
      type: String,
      required: [true, "Email address is required."],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address.",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true,
      match: [/^[0-9+\-\s()]{7,15}$/, "Please enter a valid phone number."],
    },
    age: {
      type: Number,
      required: [true, "Age is required."],
      min: [5, "Age must be at least 5."],
      max: [100, "Age must be less than or equal to 100."],
    },
    course: {
      type: String,
      required: [true, "Course selection is required."],
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "Gender selection is required."],
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Gender must be Male, Female, or Other.",
      },
    },
    enrollmentNumber: {
      type: String,
      required: [true, "Enrollment number is required."],
      unique: true,
      trim: true,
      uppercase: true,
    },
    address: {
      type: String,
      required: [true, "Address is required."],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Student", studentSchema);
