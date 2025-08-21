 import { Link } from "react-router-dom";
import axios from "../api/axios";
import { useState } from "react";
import EmptyState from "../components/EmptyState";


export default function   RecipeCard({ recipe, isFavorite = false, onRemove }) {
  const { id, title, image } = recipe;
  const [isSaving, setIsSaving] = useState(false);
  const[isSaved, setIsSaved]= useState(false);
  const[message, setMessage] = useState("");
  const[error, setError] = useState("")

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
       setError("Please login to add to favourites!");
        return;
      }
      const payload = {
        recipe: { id, title, image },
      };
        await axios.post("/favorites", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showMessage("Added to favourites!");
       setIsSaved(true);
    } catch (err) {
      console.error("Error saving favorite:", err);
      if (err.response?.status === 400)
         {
           showMessage("already in your favourites.", 1500);
            setIsSaved(true); 
          } 
          else {
                setError("Failed to save recipe.");
            }
        } finally {
            setIsSaving(false);
        }
    };
     
     if (error) {
    return (
      <EmptyState className=""
        title="Something went wrong"
        message={error}
        icon="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" 
        showAuthButtons={error.toLowerCase().includes("login")}
      />
    );
  }

    const handleRemove = async () => {

      try {
        
        const token = localStorage.getItem("token");
        if(!token)
        {
          setError("Please login first");
          return;
        }
          
        await axios.delete(`/favorites/${id}`, {
          headers: {Authorization: `Bearer ${token}`},
        });

        showMessage("Removed Successfully");
             if (onRemove) onRemove(id);
      } catch (error) {
        console.error("Error removing favourite:", error);
        setError("Failed to remove recipe.");
    }
  }

  return (
    <div className="bg-[rgba(234,234,234,0.1)] flex flex-col h-full 
    rounded-md shadow hover:scale-110 transition-transform duration-300 p-4 mb-3">
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
         {!isFavorite ? (
          <button
            onClick={handleSave}
            disabled={isSaving || isSaved}
            className="text-red-500 font-semibold cursor-pointer hover:text-red-600 text-sm"
          >
            {isSaved ? "Added" : isSaving ? "Adding..." : "Add to Favourites"}
          </button>
        ) : (
          <button
            onClick={handleRemove}
            className="text-red-500 font-semibold cursor-pointer hover:text-red-600
             text-sm hover:scale-110 transition-transform duration-200"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
    
}