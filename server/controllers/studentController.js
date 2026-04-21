import Student from "../models/Student.js";
import Attendance from "../models/Attendance.js";
import Fee from "../models/Fee.js";
import Homework from "../models/Homework.js";
import Progress from "../models/Progress.js";

export const getStudents =
  async (req, res) => {
    const students =
      await Student.find();

    res.json(students);
};

export const addStudent =
  async (req, res) => {
    const student =
      await Student.create(req.body);

    res.json(student);
};

export const updateStudent =
  async (req, res) => {
    const student =
      await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(student);
};

export const deleteStudent =
  async (req, res) => {
    const studentId =
      req.params.id;

    await Student.findByIdAndDelete(
      studentId
    );

    await Attendance.deleteMany({
      studentId
    });

    await Fee.deleteMany({
      studentId
    });

    await Homework.deleteMany({
      studentId
    });

    await Progress.deleteMany({
      studentId
    });

    res.json({
      message:
        "Student and related records deleted"
    });
};