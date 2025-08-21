import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "../api/axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/signup", { name, email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 rounded-md">
      <form onSubmit={handleSubmit} className="bg-[rgba(234,234,234,0.1)] w-full
       h-100 p-8 rounded-2xl shadow w-full max-w-md space-y-4">
        <h2 className="text-2xl  font-bold text-white text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full bg-[rgba(234,234,234,0.05)] text-white px-4 py-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-[rgba(234,234,234,0.05)]  text-white px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full  bg-[rgba(234,234,234,0.05)] text-white px-4  py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="flex justify-end items-center space-x-2">
         <p className="text-white text-sm">Already have an account?</p>
        <Link to="/login" className="text-sm text-yellow-500 hover:underline">
          Login
        </Link>
        </div>

        <button type="submit" className="w-full py-2 mt-10 bg-[rgba(244,130,34,1)] 
        hover:bg-orange-500 text-white rounded ">
          Sign Up
        </button>
      </form>
    </div>
  );
}
