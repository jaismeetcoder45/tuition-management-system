import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  grade: String,
  subjects: String,
  parentContact: String,
  monthlyFee: String
});

export default mongoose.model("Student", studentSchema);