
import { useState } from 'react';
import axios from '../api/axios';

export default function AddRecipeModal({ isOpen, onClose }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [procedure, setProcedure] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const ingredientsArray = ingredients.split('\n').filter(line => line.trim() !== '');

    if (ingredientsArray.length === 0) {
      setError('Please add at least one ingredient.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/recipe', 
        { name: title, ingredients: ingredientsArray, procedure },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Recipe added successfully!');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add recipe.');
 }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-md max-w-2xl relative">
        <h2 className="text-2xl font-bold text-white mb-6">Add a New Recipe</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Recipe Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 "
          />
          <textarea
            placeholder="Ingredients (one per line)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            rows="3"
            className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600"
          />
          <textarea
            placeholder="Procedure / Instructions"
            value={procedure}
            onChange={(e) => setProcedure(e.target.value)}
            required
            rows="3"
            className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600"
          />
          {error && <p className="text-red-400">{error}</p>}
          {success && <p className="text-green-400">{success}</p>}
          <div className="flex justify-end gap-4">
            <button type="submit" className="py-2 px-6 bg-orange-600 hover:bg-orange-700 text-white rounded-md">
              Add 
            </button>
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-600 hover:bg-gray-500 text-white rounded-md">
              Cancel
            </button>
           
          </div>
        </form>
      </div>
    </div>
  );
}
