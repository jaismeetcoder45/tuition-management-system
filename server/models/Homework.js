import mongoose from "mongoose";

const homeworkSchema =
  new mongoose.Schema({
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    },

    subject: String,

    task: String,

    status: String
  });

export default mongoose.model(
  "Homework",
  homeworkSchema
);