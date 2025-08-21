import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favourites';
import Header from './components/Header';
import Footer from './components/Footer'; 
import AddRecipeModal from './components/AddRecipe';
import { useState } from 'react';
import MyRecipes from './pages/MyRecipe';

function App() {

  const [isOpen, setIsOpen] = useState(false); 
  return (
     <div className="flex flex-col min-h-screen">
   <Header onAddRecipeClick={() => setIsOpen(true)} />     
     <main className=" flex-grow container mx-auto p-4 pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<Favorites />} />
       <Route path='/my-recipes' element={<MyRecipes />}/>
        </Routes>
      </main>
      <Footer />
      <AddRecipeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default App;
