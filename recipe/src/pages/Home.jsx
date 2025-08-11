import { useEffect, useState } from "react";
import axios from "../api/axios";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

 // ...
useEffect(() => {
    async function fetchFeatured() {
        try {
            
            const res = await axios.get("/spoonacular/complexSearch", {
                params: {
                    sort: "popularity",
                    number: 12,
                },
            });
               if (res.data && Array.isArray(res.data.results)) {
                setFeatured(res.data.results);
            } else {
                console.error("API response did not contain a results array:", res.data);
                setFeatured([]); 
            }
        } catch (err) {
            console.error("Failed to fetch featured recipes:", err);
            setFeatured([]); 
          } finally {
            setLoading(false);
        }
    }
    fetchFeatured();
}, []);


  return (
    <>
     <div className="text-center m bg-yellow-500 rounded-full">
        <p className="text-lg  text-gray-600 p-1">
          Discover delicious recipes.
        </p>
      </div>
    <div className="bg-gray-800 min-h-screen rounded-md w-full px-4">
     

      <div className="mt-6">
        <h2 className="text-3xl text-white font-bold text-center mb-8">
          Featured Recipes
        </h2>
        {loading ? (
          <p className="text-center text-white">Loading featured recipes...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
