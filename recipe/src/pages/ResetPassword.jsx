import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await axios.post(`/reset-password/${token}`, { password });
      setMsg(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setMsg("Invalid or expired token");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold">Reset Password</h2>
        {msg && <p className="text-yellow-400 text-sm">{msg}</p>}

        <input
          type="password"
          placeholder="New Password"
          className="w-full bg-gray-700 px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="w-full py-2 bg-orange-500 hover:bg-orange-600 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
}
