import { useEffect, useState } from "react";
import axios from "../api/axios";
import MyRecipeCard from "../components/MyrecipeCard";
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

     axios.get("/recipe/my", {
      headers: { Authorization: `Bearer ${token}` }
    })
     .then(res => setRecipes(res.data))
      .catch(() => setError("Failed to load your recipes."))
      .finally(() => setLoading(false));
  }, []);

     async function handleDelete(id) {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/recipe/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecipes(recipes.filter(r => r._id !== id));
    } catch (err) {
      alert("Failed to delete recipe.");
    }
  }
  

  if (loading) return <div>Loading...</div>;
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
    <div className="bg-gray-800 p-6 rounded-lg" >
      <h2 className="flex justify-center font-semibold text-gray-100 
      bg-[rgba(255,178,11,0.98)] p-3 mb-4 rounded-md">My Recipes</h2>
      <div>
       {recipes.map(recipe => (
  <MyRecipeCard
    key={recipe._id}
    recipe={recipe}
    onDelete={handleDelete}
  />
))}
      </div>
    </div>
  );
}

