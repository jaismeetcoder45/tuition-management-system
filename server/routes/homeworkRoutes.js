import express from "express";

import {
  getHomework,
  addHomework,
  updateHomework,
  deleteHomework
} from "../controllers/homeworkController.js";

const router = express.Router();

router.get("/", getHomework);

router.post("/", addHomework);

router.put("/:id", updateHomework);

router.delete("/:id", deleteHomework);

export default router;