import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NutritionChart from "../components/NutritionChart";
import axios from "../api/axios";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [nutrition, setNutrition] = useState(null);

  useEffect(() => {
    async function fetchDetailsAndNutrition() {
      try {
        const [recipeRes, nutritionRes] = await Promise.all([
          axios.get(`/spoonacular/${id}/information`),
          axios.get(`/spoonacular/${id}/nutrition`),
        ]);

        setRecipe(recipeRes.data);
        setNutrition(nutritionRes.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    }

    fetchDetailsAndNutrition();
  }, [id]);

  if (!recipe) return <p className="p-6">Loading...</p>;

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
        <h3 className="text-2xl text-white bg-blue-600 font-sans px-2
         mt-n rounded font-semibold mb-2">Nutrition Breakdown</h3>
       c
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
