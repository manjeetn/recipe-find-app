import { Link } from "react-router-dom";

export default function EmptyState({ title, message, icon, showAuthButtons = false,}){
     return (
<div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-800 rounded-md text-center px-6">

    { icon && (
        <img src={icon}
         alt="Empty state"
         className="w-32 h-32 mb-6 opacity-80" />
    )}
    <h2 className="text-2xl font-bold text-yellow-400 mb-2">{title}</h2>
    <p className="text-gray-300 mb-6">{message}</p>
     {showAuthButtons && (
        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-orange-400 transition"
          >
            Login
          </Link>
        </div>
     )}
</div>
     );

}