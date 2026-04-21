import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("April");

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/students");
    setStudents(res.data);
  };

  const fetchAttendance = async () => {
    const res = await axios.get("http://localhost:5000/api/attendance");
    setAttendance(res.data);
  };

  useEffect(() => {
    fetchStudents();
    fetchAttendance();
  }, []);

  const markAttendance = async (studentId, day, status) => {
    const existing = attendance.find(
      (item) =>
        item.studentId?._id === studentId &&
        item.date == day &&
        item.month === selectedMonth
    );

    if (existing && existing.status === status) {
      await axios.delete(
        `http://localhost:5000/api/attendance/${existing._id}`
      );
      toast.success("Removed!");
    } else {
      await axios.post("http://localhost:5000/api/attendance", {
        studentId,
        date: day,
        month: selectedMonth,
        status
      });
      toast.success("Updated!");
    }

    fetchAttendance();
  };

  const getStatus = (studentId, day) => {
    const record = attendance.find(
      (item) =>
        item.studentId?._id === studentId &&
        item.date == day &&
        item.month === selectedMonth
    );
    return record?.status;
  };

  const handleDownload = async () => {
    const element = document.getElementById("report");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("attendance_report.pdf");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Attendance Tracker
      </h1>

      <button
        onClick={handleDownload}
        className="bg-green-500 text-white px-5 py-2 rounded-lg mb-4"
      >
        Download PDF
      </button>

      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      >
        <option>January</option>
        <option>February</option>
        <option>March</option>
        <option>April</option>
        <option>May</option>
        <option>June</option>
        <option>July</option>
        <option>August</option>
        <option>September</option>
        <option>October</option>
        <option>November</option>
        <option>December</option>
      </select>

      <input
        type="text"
        placeholder="Search Student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded mb-6"
      />

      {/* ✅ PDF AREA */}
      <div id="report">
        {students
          .filter((s) =>
            s.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((student) => (
            <div
              key={student._id}
              className="bg-white p-6 rounded-xl shadow mb-6"
            >
              <h2 className="font-bold">{student.name}</h2>

              <div className="grid grid-cols-7 gap-2 mt-4">
                {days.map((day) => (
                  <div
                    key={day}
                    className="border p-2 text-center"
                  >
                    <p>{day}</p>

                    <div className="flex gap-1 justify-center">
                      <button
                        onClick={() =>
                          markAttendance(student._id, day, "Present")
                        }
                        className={
                          getStatus(student._id, day) === "Present"
                            ? "bg-green-500 text-white px-2"
                            : "bg-gray-200 px-2"
                        }
                      >
                        P
                      </button>

                      <button
                        onClick={() =>
                          markAttendance(student._id, day, "Absent")
                        }
                        className={
                          getStatus(student._id, day) === "Absent"
                            ? "bg-red-500 text-white px-2"
                            : "bg-gray-200 px-2"
                        }
                      >
                        A
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Attendance;