import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";

export default function VerifyEmail() {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function verify() {
      try {
        const res = await axios.get(`/verify/${token}`);
        setMessage(res.data.message);
        setSuccess(true);
      } catch (err) {
        setMessage(err.response?.data?.message || "Verification failed");
      }
    }
    verify();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white text-center">
      <div className="bg-gray-900 p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <p className={`mb-4 ${success ? "text-green-400" : "text-red-400"}`}>
          {message}
        </p>
        {success && (
          <Link to="/login" className="text-yellow-400 hover:underline">
            Go to Login
          </Link>
        )}
      </div>
    </div>
  );
}
