import express from "express";

import {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", getStudents);

router.post("/", addStudent);

router.put("/:id", updateStudent);

router.delete("/:id", deleteStudent);

export default router;