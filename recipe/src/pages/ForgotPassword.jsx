import { useState } from "react";
import axios from "../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await axios.post("/forgot-password", { email });
      setMsg(res.data.message);
    } catch (err) {
      setMsg("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold">Forgot Password</h2>
        {msg && <p className="text-yellow-400 text-sm">{msg}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full bg-gray-700 px-4 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className="w-full py-2 bg-orange-500 hover:bg-orange-600 rounded">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
