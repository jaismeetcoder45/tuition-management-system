import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Fees() {
  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] =
    useState("April");

  const fetchStudents = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/students"
    );
    setStudents(res.data);
  };

  const fetchFees = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/fees"
    );
    setFees(res.data);
  };

  useEffect(() => {
    fetchStudents();
    fetchFees();
  }, []);

  const updateFeeStatus = async (
    student,
    status
  ) => {
    await axios.post(
      "http://localhost:5000/api/fees",
      {
        studentId: student._id,
        amount: student.monthlyFee,
        month: selectedMonth,
        status
      }
    );

    fetchFees();

    toast.success("Fee Updated!");
  };

  const getFeeStatus = (studentId) => {
    const fee = fees.find(
      (item) =>
        item.studentId?._id === studentId &&
        item.month === selectedMonth
    );

    return fee?.status;
  };

  const handleDownload = async () => {
  const element = document.getElementById("report");

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const imgWidth = 210;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save("fees_report.pdf");
};

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Fee Management
      </h1>

      <button
        onClick={handleDownload}
        className="bg-green-500 text-white px-5 py-2 rounded-lg mb-4 hover:scale-105 transition"
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
        className="w-full p-3 border rounded mb-4"
      />

      <select
        value={selectedMonth}
        onChange={(e) =>
          setSelectedMonth(e.target.value)
        }
        className="w-full p-3 border rounded mb-6"
      >
        <option>April</option>
        <option>May</option>
        <option>June</option>
      </select>

      <div id="report" className="space-y-4">
        {students
          .filter((student) =>
            student.name
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((student) => (
            <div
              key={student._id}
              className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div>
                <h2 className="font-bold">
                  {student.name}
                </h2>

                <p>
                  ₹ {student.monthlyFee}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    updateFeeStatus(
                      student,
                      "Paid"
                    )
                  }
                  className={`px-4 py-2 rounded ${
                    getFeeStatus(
                      student._id
                    ) === "Paid"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Paid
                </button>

                <button
                  onClick={() =>
                    updateFeeStatus(
                      student,
                      "Pending"
                    )
                  }
                  className={`px-4 py-2 rounded ${
                    getFeeStatus(
                      student._id
                    ) === "Pending"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Pending
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Fees;