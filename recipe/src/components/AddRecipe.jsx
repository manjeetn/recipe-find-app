
import { useState } from 'react';
import axios from '../api/axios';

export default function AddRecipeModal({ isOpen, onClose }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [procedure, setProcedure] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imageFile, setImageFile] = useState(null);

  if (!isOpen) return null;

 const resetForm = () => {
    setTitle('');
    setIngredients('');
    setProcedure('');
    setImageFile(null);
    setError('');
    setSuccess('');
  };

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
      const formData = new FormData();
      formData.append('name', title);
      formData.append('ingredients', ingredients);
      formData.append('procedure', procedure);
      if (imageFile) {
        formData.append('image', imageFile); 
      }
      
      const res = await axios.post('/recipe', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      setSuccess('Recipe added successfully!');
      setTimeout(() => {
        resetForm();
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add recipe.');
    }
  };

   const handleClose = () => {
    resetForm();   
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 z-50 flex justify-center items-center">
   <div className="bg-[rgba(234,234,234,0.1)] p-8 rounded-lg shadow-xl w-full max-w-2xl mx-4 sm:mx-0 relative">
        <h2 className="text-2xl font-bold text-white mb-6">Add a New Recipe</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
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
          <input
            type="file"
            accept="image/*"
            onChange={e => setImageFile(e.target.files[0])}
            className="w-full p-3 bg-gray-800 text-white rounded-md border cursor-pointer hover:bg-gray-700 border-gray-600"
          />
          {error && <p className="text-red-400">{error}</p>}
          {success && <p className="text-green-400">{success}</p>}
          <div className="flex justify-end gap-4">
            <button type="submit" className="py-2 px-6 bg-orange-600 hover:bg-orange-700 cursor-pointer text-white rounded-md">
              Add 
            </button>
            <button type="button" onClick={handleClose} className="py-2 px-4 bg-gray-700 hover:bg-gray-500 cursor-pointer text-white rounded-md">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
