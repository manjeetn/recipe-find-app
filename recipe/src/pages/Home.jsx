
import { useEffect, useState } from "react";
import axios from "../api/axios";
import RecipeCard from "../components/RecipeCard";
import EmptyState from "../components/EmptyState";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1); 
  const [totalResults, setTotalResults] = useState(0);

  const limit = 12; 

  useEffect(() => {
    async function fetchFeatured() {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("/spoonacular/complexSearch", {
          params: {
            sort: "popularity",
            number: limit,
            offset: (page - 1) * limit, 
          },
        });

        if (res.data && Array.isArray(res.data.results)) {
          setFeatured(res.data.results);
          setTotalResults(res.data.totalResults || 0);
        } else {
          console.error("API response did not contain a results array:", res.data);
          setFeatured([]);
          setError("Unexpected response from server.");
        }
      } catch (err) {
        console.error("Failed to fetch featured recipes:", err);
        setError("Failed to fetch recipes. Please try again later.");
        setFeatured([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, [page]); 

  const totalPages = Math.ceil(totalResults / limit);

  return (
    <>
      <div className="text-center bg-yellow-500 rounded-full">
        <p className="text-lg text-black">
          Discover delicious recipes.
        </p>
      </div>
      <div className="bg-gray-800 min-h-screen rounded-md w-full px-4">
        <div className="mt-5 py-6">
          <h2 className="text-3xl text-white font-bold text-center mb-8">
            Featured Recipes
          </h2>
          {loading ? (
            <p className="text-center text-white">Loading featured recipes...</p>
          ) : error ? (
            <EmptyState
              title="Oops! Something went wrong"
              message={error}
              icon="https://cdn-icons-png.flaticon.com/128/6750/6750337.png"
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featured.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>

              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-white">
                  Page {page} 
                </span>
                <button
                  onClick={() => setPage((prev) => (page < totalPages ? prev + 1 : prev))}
                  disabled={page >= totalPages}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
