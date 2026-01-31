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
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';



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
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

        </Routes>
      </main>

      <Footer />

      <AddRecipeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default App;
