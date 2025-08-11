import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view your favorites.");
      return;
    }

    axios
      .get("/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setFavorites(res.data))
      .catch((err) => {
        console.error("Error fetching favorites:", err);
        setError("Failed to load favorites.");
      });
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (

<div className="flex flex-wrap bg-gray-800">
  {favorites.map((recipe) => (
    <div key={recipe.id} className="w-md md:w-1/2 lg:w-1/3 p-2">
      <div className="bg-gray-100 p-4 rounded shadow h-full">
        <img src={recipe.image} alt={recipe.title} className="w-full h-auto mt-2 rounded" />
        <h2 className="text-lg font-semibold">{recipe.title}</h2>
      </div>
    </div>
    
  ))}
</div>

  );
}
