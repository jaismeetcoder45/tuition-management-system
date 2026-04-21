import Attendance from "../models/Attendance.js";

export const getAttendance =
  async (req, res) => {
    const attendance =
      await Attendance.find()
      .populate("studentId");

    res.json(attendance);
};

export const addAttendance =
  async (req, res) => {
    const existingAttendance =
      await Attendance.findOne({
        studentId: req.body.studentId,
        date: req.body.date,
        month: req.body.month
      });

    if (existingAttendance) {
      existingAttendance.status =
        req.body.status;

      await existingAttendance.save();

      return res.json(
        existingAttendance
      );
    }

    const attendance =
      await Attendance.create(req.body);

    res.json(attendance);
};

export const deleteAttendance =
  async (req, res) => {
    await Attendance.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Attendance Removed"
    });
};