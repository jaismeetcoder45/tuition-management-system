import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] =
    useState({
      email: "",
      password: ""
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      toast.success(
        "Login Successful!"
      );

      window.location.href = "/";

    } catch (err) {
      toast.error(
        "Invalid Credentials"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />

        <button className="bg-blue-500 text-white w-full py-3 rounded">
          Login
        </button>

        <p className="text-center mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500">
                Signup
            </a>
            </p>
      </form>
    </div>
  );
}

export default Login;