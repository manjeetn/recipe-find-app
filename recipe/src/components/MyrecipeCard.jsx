
export default function MyRecipeCard({ recipe, onDelete }) {
  const API_BASE = import.meta.env.REACT_APP_API_BASE || "http://localhost:5000";

  return (
    <div className="bg-gray-100 rounded-lg shadow-sm p-4 mb-4 border border-gray-200 flex flex-col min-h-[300px] max-w-sm ">
      <div className="flex-1">
        {recipe.image ? (
          <img
            className="w-full h-32 object-cover rounded mb-2"
            src={
              recipe.image.startsWith("http")
                ? recipe.image
                : API_BASE + recipe.image
            }
            alt={recipe.name || "Recipe Image"}
          />
        ) : (
          <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500 rounded mb-2">
            No Image
          </div>
        )}

        <h2 className="text-xl font-semibold text-orange-600 mb-1 text-center truncate">{recipe.name}</h2>

        <div className="mb-1">
          <h4 className="font-medium text-gray-700 text-sm mb-1">Ingredients:</h4>
          <p className="text-gray-600 text-sm">{recipe.ingredients.join(", ")}</p>
        </div>

        <div className="mb-1">
          <h4 className="font-medium text-gray-700 text-sm mb-1">Procedure:</h4>
          <ul className="list-disc ml-5 text-gray-600 text-sm">
            {(Array.isArray(recipe.procedure) ? recipe.procedure : recipe.procedure.split('\n'))
              .filter(Boolean)
              .map((step, i) => (
                <li key={i}>{step}</li>
              ))}
          </ul>
        </div>
      </div>
      <button
        className="mt-auto px-2 py-2 bg-red-600 cursor-pointer hover:bg-red-700 text-white rounded-lg font-semibold shadow transition-all text-sm"
        onClick={() => onDelete(recipe._id)}
      >
        Delete
      </button>
    </div>
  );
}
