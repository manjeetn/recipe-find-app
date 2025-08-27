
import { useEffect, useState } from "react";
import axios from "../api/axios";
import MyrecipeCard from "../components/MyrecipeCard";
import EmptyState from "../components/EmptyState";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view your recipes.");
      setLoading(false);
      return;
    }

    axios
      .get("/recipe/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRecipes(res.data))
      .catch(() => setError("Failed to load your recipes."))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/recipe/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert("Failed to delete recipe.");
    }
  }

  if (loading) return <div className="text-center py-10 text-white">Loading your recipes...</div>;

  if (error) {
     return ( <EmptyState 
       title="Oops!"
       message={error}
       icon="https://cdn-icons-png.flaticon.com/512/564/564619.png"
       /> 
      )}
 
if (recipes.length === 0)  {
    return ( <EmptyState 
      title="No Added Recipes"
      message=" You haven't added any recipes yet." 
      icon= "https://cdn-icons-png.flaticon.com/512/4076/4076507.png" 
      /> 
     );   
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <MyrecipeCard
          key={recipe._id}
          recipe={recipe}
          onDelete={() => handleDelete(recipe._id)}
        />
      ))}
    </div>
  );
}
