import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const studentRes = await axios.get(
      "http://localhost:5000/api/students"
    );
    const feeRes = await axios.get(
      "http://localhost:5000/api/fees"
    );
    const attendanceRes = await axios.get(
      "http://localhost:5000/api/attendance"
    );

    setStudents(studentRes.data);
    setFees(feeRes.data);
    setAttendance(attendanceRes.data);
  };

  // 📊 Fee Data
  const paid = fees.filter(
    (f) => f.status === "Paid"
  ).length;

  const pending = fees.filter(
    (f) => f.status === "Pending"
  ).length;

  const feeData = [
    { name: "Paid", value: paid },
    { name: "Pending", value: pending }
  ];

  // 📊 Attendance Data
  const present = attendance.filter(
    (a) => a.status === "Present"
  ).length;

  const absent = attendance.filter(
    (a) => a.status === "Absent"
  ).length;

  const attendanceData = [
    { name: "Present", value: present },
    { name: "Absent", value: absent }
  ];



  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-700">
        Dashboard Overview
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-2xl shadow">
          <h2>Total Students</h2>
          <p className="text-2xl font-bold">
            {students.length}
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-2xl shadow">
          <h2>Attendance Records</h2>
          <p className="text-2xl font-bold">
            {attendance.length}
          </p>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-2xl shadow">
          <h2>Fee Records</h2>
          <p className="text-2xl font-bold">
            {fees.length}
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow">
          <h2>Homework Tasks</h2>
          <p className="text-2xl font-bold">
            0
          </p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-6">
        {/* Fee Chart */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold mb-4">
            Fees Overview
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={feeData}
                dataKey="value"
                outerRadius={80}
              >
                <Cell fill="#22c55e" />
                <Cell fill="#ef4444" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Chart */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold mb-4">
            Attendance Overview
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;