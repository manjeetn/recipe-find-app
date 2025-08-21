import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NutritionChart from "../components/NutritionChart";
import axios from "../api/axios";
import EmptyState from "../components/EmptyState";


export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);


   const token = localStorage.getItem("token");
  if (!token) {
    return (
      <EmptyState
        title="Login Required"
        message="Please log in to view recipe details."
        showAuthButtons={true}
      />
    );
  }
  useEffect(() => {
    async function fetchDetailsAndNutrition() {
      setLoading(true);
      setError("");
      try {
        const [recipeRes, nutritionRes] = await Promise.all([
          axios.get(`/spoonacular/${id}/information`),
          axios.get(`/spoonacular/${id}/nutrition`),
        ]);

        setRecipe(recipeRes.data);
        setNutrition(nutritionRes.data);
      } catch (err) {
        setError("Failed to load recipe details.");
        setRecipe(null);
        setNutrition(null);
        console.error("Failed to fetch data:", err);
      }
      finally {
        setLoading(false);
      }
    }
    fetchDetailsAndNutrition();
  }, [id]);

  if (error) {
     return ( <EmptyState 
       title="Oops! Something went wrong"
       message={error}
       icon="https://cdn-icons-png.flaticon.com/512/564/564619.png"
       />
      )
}  

 if (loading) return <div>Loading...</div>;
  if (error) return (
    <EmptyState
      title="Error"
      message={error}
      showAuthButtons={false}
    />
  );
  
  if (!recipe) return null;  

  return (
    <div className="p-6 bg-gray-800 rounded-md">
      <h2 className="text-2xl text-white bg-[rgba(234,234,234,0.2)] 
      p-2 rounded-md mb-4 font-semibold mb-2">{recipe.title}</h2>
      <div className="bg-[rgba(234,234,234,0.1)] rounded p-4">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full max-w-md mb-4 rounded bg-red-500"
      />
       <hr className="border-gray-400 my-2 "/>
      <p className="text-gray-300 mb-4">
        {recipe.summary.replace(/<[^>]+>/g, "")}
      </p>
      
      <a
        href={recipe.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        View full recipe
      </a>
         </div>
      <div className="mt-8">
        <h3 className="text-2xl text-gray-700 bg-yellow-500 font-sans px-4
         mt-n rounded-full font-semibold mb-4">Nutrition Breakdown</h3>
        {nutrition ? (
          <div className="bg-gray-50 shadow-md rounded-lg p-4 max-w-md">
            <NutritionChart nutrition={nutrition} />
          </div>
        ) : (
          <p className="text-gray-500">Loading nutrition info...</p>
        )}
      </div>
    </div>
  );
}
