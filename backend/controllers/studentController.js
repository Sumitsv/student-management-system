const Student = require("../models/Student");

// @desc    Get all students or search students
// @route   GET /api/students
// @access  Public
const getStudents = async (req, res, next) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), "i");
      query = {
        $or: [
          { fullName: searchRegex },
          { email: searchRegex },
          { enrollmentNumber: searchRegex },
          { course: searchRegex },
        ],
      };
    }

    const students = await Student.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single student by ID
// @route   GET /api/students/:id
// @access  Public
const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      res.status(404);
      throw new Error("Student not found with the provided ID.");
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new student
// @route   POST /api/students
// @access  Public
const createStudent = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      age,
      course,
      gender,
      enrollmentNumber,
      address,
    } = req.body;

    // Check if enrollment number already exists
    const existingStudent = await Student.findOne({
      enrollmentNumber: enrollmentNumber
        ? enrollmentNumber.trim().toUpperCase()
        : "",
    });

    if (existingStudent) {
      res.status(400);
      throw new Error(
        "Enrollment number already exists. Please use a unique ID.",
      );
    }

    const student = await Student.create({
      fullName,
      email,
      phone,
      age,
      course,
      gender,
      enrollmentNumber: enrollmentNumber
        ? enrollmentNumber.trim().toUpperCase()
        : "",
      address,
    });

    res.status(201).json({
      success: true,
      message: "Student registered successfully.",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an existing student
// @route   PUT /api/students/:id
// @access  Public
const updateStudent = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      age,
      course,
      gender,
      enrollmentNumber,
      address,
    } = req.body;

    let student = await Student.findById(req.params.id);

    if (!student) {
      res.status(404);
      throw new Error("Student record not found.");
    }

    // Check for unique enrollment number if changed
    if (
      enrollmentNumber &&
      enrollmentNumber.trim().toUpperCase() !== student.enrollmentNumber
    ) {
      const duplicate = await Student.findOne({
        enrollmentNumber: enrollmentNumber.trim().toUpperCase(),
      });
      if (duplicate) {
        res.status(400);
        throw new Error(
          "Enrollment number is already in use by another student.",
        );
      }
    }

    student.fullName = fullName || student.fullName;
    student.email = email || student.email;
    student.phone = phone || student.phone;
    student.age = age !== undefined ? age : student.age;
    student.course = course || student.course;
    student.gender = gender || student.gender;
    student.enrollmentNumber = enrollmentNumber
      ? enrollmentNumber.trim().toUpperCase()
      : student.enrollmentNumber;
    student.address = address || student.address;

    const updatedStudent = await student.save();

    res.status(200).json({
      success: true,
      message: "Student record updated successfully.",
      data: updatedStudent,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a student record
// @route   DELETE /api/students/:id
// @access  Public
const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      res.status(404);
      throw new Error("Student not found.");
    }

    await student.deleteOne();

    res.status(200).json({
      success: true,
      message: "Student record deleted successfully.",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
