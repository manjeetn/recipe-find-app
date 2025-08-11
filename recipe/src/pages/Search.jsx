import { useState } from "react";
import axios from "../api/axios";
import RecipeCard from "../components/RecipeCard";

export default function Search() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
     const res = await axios.get("/spoonacular/complexSearch", {
            params: {
                query,
                number: 12,
            },
        });
          if (res.data && Array.isArray(res.data.results)) {
            setRecipes(res.data.results);
        } else {
            console.error("API search response did not contain a results array:", res.data);
            setRecipes([]);
        }
      setQuery("");
  
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-md"> 
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="e.g. pasta, chicken..."
          className="px-4  bg-[rgba(234,234,234,0.05)] py-2 border rounded text-white w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} 

        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 border
           cursor-pointer border-orange-700 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>
       {recipes.length > 0 && (
        <h2 className="text-2xl text-white font-bold mb-2">Searched Recipes</h2>
     )}
      
      <hr className="border-gray-500 mt-n mb-4" />
    <div className="flex flex-wrap p-2 gap-6">
       {recipes.map((recipe) => (
    <div key={recipe.id} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]">
      <RecipeCard recipe={recipe} />
     </div>
     ))}
  </div>

    </div>
  );
}
