import mongoose from "mongoose";

const progressSchema =
  new mongoose.Schema({
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    },

    subject: String,

    chapter: String,

    status: String
  });

export default mongoose.model(
  "Progress",
  progressSchema
);