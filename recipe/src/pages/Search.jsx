
import { useState } from "react";
import axios from "../api/axios";
import RecipeCard from "../components/RecipeCard";
import EmptyState from "../components/EmptyState";

export default function Search() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const limit = 12;

  const handleSearch = async (pageNum = 1) => {
    if (!query) return;

    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/spoonacular/complexSearch", {
        params: {
          query,
          number: limit,
          offset: (pageNum - 1) * limit, 
        },
      });

      if (res.data && Array.isArray(res.data.results)) {
        setRecipes(res.data.results);
        setTotalResults(res.data.totalResults || 0);

        if (res.data.results.length === 0) {
          setError("No recipes found. Try a different keyword.");
        }
      } else {
        console.error("API search response did not contain a results array:", res.data);
        setRecipes([]);
        setError("Unexpected response from server.");
      }
    } catch (err) {
      console.error("Search failed:", err);
      setRecipes([]);
      setError("Failed to fetch recipes. Please try again later.");
    } finally {
      setLoading(false);
      setPage(pageNum);
    }
  };

  const totalPages = Math.ceil(totalResults / limit);

  return (
    <div className="p-4 bg-gray-800 rounded-md min-h-screen">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="e.g. pasta, chicken..."
          className="px-4 bg-[rgba(234,234,234,0.05)] py-2 border rounded text-white w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(1)} 
        />
        <button
          onClick={() => handleSearch(1)} 
          className="px-4 py-2 bg-orange-500 border border-orange-700 text-white rounded cursor-pointer hover:bg-orange-600"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-white text-center">Searching recipes...</p>
      ) : error ? (
        <EmptyState
          title="Oops! Something went wrong"
          message={error}
          icon={
            error.includes("No recipes")
              ? "https://cdn-icons-png.flaticon.com/512/4076/4076507.png"
              : "https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
          }
        />
      ) : recipes.length > 0 ? (
        <>
          <h2 className="text-2xl text-white font-bold mb-2">Searched Recipes</h2>
          <hr className="border-gray-500 mt-2 mb-4" />
          <div className="flex flex-wrap p-2 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => handleSearch(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-white">
              Page {page} 
            </span>
            <button
              onClick={() => handleSearch(page + 1)}
              disabled={page >= totalPages}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
