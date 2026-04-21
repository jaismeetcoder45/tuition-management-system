import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Students() {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    subjects: "",
    parentContact: "",
    monthlyFee: ""
  });

  const [editId, setEditId] = useState(null);

  const fetchStudents = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/students"
    );
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(
        `http://localhost:5000/api/students/${editId}`,
        formData
      );
      toast.success("Student Updated!");
      setEditId(null);
    } else {
      await axios.post(
        "http://localhost:5000/api/students",
        formData
      );
      toast.success("Student Added!");
    }

    fetchStudents();

    setFormData({
      name: "",
      grade: "",
      subjects: "",
      parentContact: "",
      monthlyFee: ""
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete?"
    );
    if (!confirmDelete) return;

    await axios.delete(
      `http://localhost:5000/api/students/${id}`
    );

    toast.success("Deleted Successfully!");
    fetchStudents();
  };

  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      grade: student.grade,
      subjects: student.subjects,
      parentContact: student.parentContact,
      monthlyFee: student.monthlyFee
    });

    setEditId(student._id);
  };

  const handleDownload = async () => {
  const element = document.getElementById("report");

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save("students_report.pdf");
};

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">
        Student Management
      </h1>

      <button
        onClick={handleDownload}
        className="bg-green-500 text-white px-5 py-2 rounded-lg mb-4 hover:scale-105 transition"
      >
        Download PDF
      </button>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 space-y-4"
      >
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          name="grade"
          placeholder="Class"
          value={formData.grade}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          name="subjects"
          placeholder="Subjects"
          value={formData.subjects}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          name="parentContact"
          placeholder="Parent Contact"
          value={formData.parentContact}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <input
          name="monthlyFee"
          placeholder="Monthly Fee"
          value={formData.monthlyFee}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg hover:scale-105 transition">
          {editId ? "Update Student" : "Add Student"}
        </button>
      </form>

      

      {/* LIST */}
      <div id="report" className="mt-6 space-y-4">
        {students.map((student) => (
          <div
                       key={student._id}
            className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-gray-200 flex justify-between items-center hover:shadow-xl transition"
          >
            <div>
              <h2 className="font-bold text-lg text-gray-700">
                {student.name}
              </h2>

              <p className="text-gray-500">
                Class: {student.grade}
              </p>

              <p className="text-gray-500">
                Subjects: {student.subjects}
              </p>

              <p className="text-gray-500">
                Contact: {student.parentContact}
              </p>

              <p className="text-gray-600 font-semibold">
                ₹ {student.monthlyFee}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(student)}
                className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(student._id)
                }
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Students;