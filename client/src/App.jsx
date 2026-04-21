import { BrowserRouter, Routes, Route } from "react-router-dom"

import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"

import Dashboard from "./pages/Dashboard"
import Students from "./pages/Students"
import Attendance from "./pages/Attendance"
import Fees from "./pages/Fees"
import Progress from "./pages/Progress"
import Homework from "./pages/Homework"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

const isLoggedIn = localStorage.getItem("token");

function App() {
  return (
  <BrowserRouter>
    {isLoggedIn ? (

      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1 p-6">
          <Navbar />

          <div className="mt-6">
            <Routes>
              <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
              <Route
              path="/students"
              element={
                <ProtectedRoute>
                  <Students />
                </ProtectedRoute>
              }
            />
              <Route
              path="/attendance"
              element={
                <ProtectedRoute>
                  <Attendance />
                </ProtectedRoute>
              }
            />
              <Route
              path="/fees"
              element={
                <ProtectedRoute>
                  <Fees />
                </ProtectedRoute>
              }
            />
              <Route
              path="/progress"
              element={
                <ProtectedRoute>
                  <Progress />
                </ProtectedRoute>
              }
            />
              <Route
              path="/homework"
              element={
                <ProtectedRoute>
                  <Homework />
                </ProtectedRoute>
              }
            />
            </Routes>
          </div>
        </div>
      </div>

    ) : (

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>

    )}
  </BrowserRouter>
);
}

export default App