 import { Link } from "react-router-dom";
import axios from "../api/axios";
import { useState } from "react";

export default function RecipeCard({ recipe }) {
  const { id, title, image } = recipe;
  const [isSaving, setIsSaving] = useState(false);
  const[isSaved, setIsSaved]= useState(false);
  const[message, setMessage] = useState("");

  const showMessage = (text, duration = 2000) => {
  setMessage(text);
  setTimeout(() => setMessage(""), duration);
};

   const handleSave = async () => {
    if(isSaved) return;
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
       showMessage("Please login to add to favourites!", 2000);
        return;
      }
      const payload = {
        recipe: { id, title, image },
      };
        await axios.post("/favorites", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showMessage("saved to favorites!");
    } catch (err) {
      console.error("Error saving favorite:", err);
      if (err.response?.status === 400)
         {
           showMessage("already in your favourites.", 1500);
            setIsSaved(true); 
          } 
          else {
                showMessage("Failed to save recipe.", 1500);
            }
        } finally {
            setIsSaving(false);
        }
    };

  return (
    <div className="bg-[rgba(234,234,234,0.1)] flex flex-col h-full rounded-md shadow hover:scale-110 transition-transform duration-300 p-4 mb-3">
     {message && ( 
       <div className="text-yellow-300 text-sm mb-2">{message}</div>
    )}
      <img src={image} alt={title} className=" w-full h-48 object-cover rounded mb-2" />
      <h3 className="text-sm text-white font-semibold mb-2">{title}</h3>
      <div className="mt-auto flex justify-between items-center">
        <Link
          to={`/recipe/${id}`}
          className="text-blue-500 font-bold hover:underline text-sm"
        >
          View Details
        </Link>
        <button
          onClick={handleSave}
           disabled={isSaving || isSaved}
          className="text-red-500 font-semibold cursor-pointer hover:text-red-600 text-sm"
        >
          {isSaved ? "Added" : (isSaving ? "Adding..." : "Add to Favourites")}
        </button>
      </div>
    </div>
  );

}





 