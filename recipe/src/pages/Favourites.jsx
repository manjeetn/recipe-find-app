import { useEffect, useState } from "react";
import axios from "../api/axios";
import RecipeCard from "../components/RecipeCard";
import EmptyState from "../components/EmptyState";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");
   const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view your favourites.");
      setLoading(false);
      return;
    }

    axios.get("/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setFavorites(res.data))
      .catch((err) => {
        console.error("Error fetching favourites:", err);
        setError("Failed to load favourites.");
      })
       .finally(() => setLoading(false));
  }, []);

   const handleRemove = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;
  if (error) {
    return ( <EmptyState 
      title="Oops! Something went wrong"
      message={error}
      icon="https://cdn-icons-png.flaticon.com/512/564/564619.png"
      /> )}


   if (favorites.length === 0) {
    return ( <EmptyState 
      title="No Added favourites"
      message=" You haven't added any recipes to your favourites yet." 
      icon= "https://cdn-icons-png.flaticon.com/512/4076/4076507.png" 
      /> 
     );   
  }
  return (
<div className="flex flex-wrap rounded-md bg-gray-800">
  {favorites.map((fav) => (
    <div key={fav._id} className="w-full sm:w-1/2 lg:w-1/3 p-5">   
         <RecipeCard
            recipe={{
              id: fav.id, 
              title: fav.title,
              image: fav.image,
              mongoId: fav._id, 
            }}
            isFavorite={true}
            onRemove={handleRemove}
          />
    </div>
    
  ))}
</div>

  );
}
