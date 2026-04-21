import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Homework() {
  const [students, setStudents] = useState([]);
  const [homework, setHomework] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    studentId: "",
    subject: "",
    task: "",
    status: "Pending"
  });

  const fetchStudents = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/students"
    );
    setStudents(res.data);
  };

  const fetchHomework = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/homework"
    );
    setHomework(res.data);
  };

  useEffect(() => {
    fetchStudents();
    fetchHomework();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(
        `http://localhost:5000/api/homework/${editId}`,
        formData
      );
      setEditId(null);
      toast.success("Homework Updated!");
    } else {
      await axios.post(
        "http://localhost:5000/api/homework",
        formData
      );
      toast.success("Homework Added!");
    }

    fetchHomework();

    setFormData({
      studentId: "",
      subject: "",
      task: "",
      status: "Pending"
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/homework/${id}`
    );
    fetchHomework();
    toast.success("Homework Deleted!");
  };

  const handleEdit = (item) => {
    setFormData({
      studentId: item.studentId._id,
      subject: item.subject,
      task: item.task,
      status: item.status
    });

    setEditId(item._id);
  };

  const handleDownload = async () => {
    const element = document.getElementById("report");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("homework_report.pdf");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Homework Management
      </h1>

      <button
        onClick={handleDownload}
        className="bg-green-500 text-white px-5 py-2 rounded-lg mb-4"
      >
        Download PDF
      </button>

      <input
        type="text"
        placeholder="Search Student..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full p-3 border rounded mb-6"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-6"
      >
        <select
          value={formData.studentId}
          onChange={(e) =>
            setFormData({
              ...formData,
              studentId: e.target.value
            })
          }
          className="w-full p-3 border rounded mb-4"
        >
          <option>Select Student</option>

          {students.map((student) => (
            <option
              key={student._id}
              value={student._id}
            >
              {student.name}
            </option>
          ))}
        </select>

        <input
          value={formData.subject}
          placeholder="Subject"
          onChange={(e) =>
            setFormData({
              ...formData,
              subject: e.target.value
            })
          }
          className="w-full p-3 border rounded mb-4"
        />

        <input
          value={formData.task}
          placeholder="Homework Task"
          onChange={(e) =>
            setFormData({
              ...formData,
              task: e.target.value
            })
          }
          className="w-full p-3 border rounded mb-4"
        />

        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value
            })
          }
          className="w-full p-3 border rounded mb-4"
        >
          <option>Pending</option>
          <option>Completed</option>
        </select>

        <button className="bg-blue-500 text-white px-6 py-3 rounded">
          {editId ? "Update Homework" : "Save Homework"}
        </button>
      </form>

      {/* ✅ PDF AREA */}
      <div id="report">
        {homework
          .filter((item) =>
            item.studentId?.name
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-xl shadow mb-4 flex justify-between"
            >
              <div>
                <h2>{item.studentId?.name}</h2>
                <p>{item.subject}</p>
                <p>{item.task}</p>

                <span
                  className={`px-4 py-1 rounded-full ${
                    item.status === "Completed"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(item._id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
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

export default Homework;