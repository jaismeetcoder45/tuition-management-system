import express from "express";

import {
  getAttendance,
  addAttendance,
  deleteAttendance
} from "../controllers/attendanceController.js";



const router = express.Router();

router.get("/", getAttendance);

router.post("/", addAttendance);

router.delete("/:id", deleteAttendance);

export default router;