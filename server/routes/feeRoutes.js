import express from "express";

import {
  getFees,
  addFee,
  deleteFee
} from "../controllers/feeController.js";

const router = express.Router();

router.get("/", getFees);

router.post("/", addFee);

router.delete("/:id", deleteFee);

export default router;