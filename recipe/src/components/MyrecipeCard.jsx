
export default function MyRecipeCard({ recipe, onDelete }) {

  return (

<div className="bg-gray-50 rounded-lg shadow-md p-6 mb-6 border border-gray-200 transition-all hover:shadow-lg">
  <h2 className="text-2xl font-semibold text-orange-600 mb-2">{recipe.name}</h2>
  <hr className="border-gray-300 my-2" />

  <div className="flex gap-12 mb-4">
    <div className="w-1/2">
      <h4 className="font-medium text-gray-800 mb-1">Ingredients:</h4>
      <ul className="list-disc ml-6 text-gray-700">
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
    </div>

    <div className="w-1/2">
      <h4 className="font-medium text-gray-800 mb-1">Procedure:</h4>
      <p className="text-gray-700 whitespace-pre-line">{recipe.procedure}</p>
    </div>
  </div>

 
    <button
      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow transition-all"
      onClick={() => onDelete(recipe._id)}
    >
      Delete
    </button>
  
</div>
  )
}