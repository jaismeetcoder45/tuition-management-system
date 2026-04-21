import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
  const [formData, setFormData] =
    useState({
      name: "",
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

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      toast.success(
        "Signup Successful! Please login."
      );

      window.location.href = "/login";

    } catch (err) {
      toast.error(
        "User already exists"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Signup
        </h1>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />

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

        <button className="bg-green-500 text-white w-full py-3 rounded">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;