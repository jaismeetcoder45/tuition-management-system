import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaClipboardCheck,
  FaMoneyBill,
  FaChartLine,
  FaBook
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Students", path: "/students", icon: <FaUserGraduate /> },
    { name: "Attendance", path: "/attendance", icon: <FaClipboardCheck /> },
    { name: "Fees", path: "/fees", icon: <FaMoneyBill /> },
    { name: "Progress", path: "/progress", icon: <FaChartLine /> },
    { name: "Homework", path: "/homework", icon: <FaBook /> }
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-blue-700 to-indigo-800 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">
        Tuition Panel
      </h1>

      <div className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              location.pathname === item.path
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-white/20"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;