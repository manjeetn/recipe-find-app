
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ onAddRecipeClick }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload(); 
  };

  return (
    <header className=" fixed top-0 left-0 z-50 bg-gray-900 w-full text-white shadow-md p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[rgba(244,130,34,1)]  hover:scale-110 transition-transform duration-200 transition">
          FlavourFind
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/search" className="hover:text-orange-400 hover:scale-110 border border-orange-700 font-bold py-2 px-4 rounded transition">
           Search
          </Link> 
          {token ? (
            <>
              <button
                onClick={onAddRecipeClick}
                className="text-green-500 hover:text-green-400 cursor-pointer font-bold hover:underline rounded-full transition"
              >
                Add Recipe 
              </button>
              
              <Link to="/favorites" className=" text-red-500  font-bold hover:underline rounded hover:scale-110 transition-transform duration-200 px-4 transition">
                Favourites
              </Link>
              <button
                onClick={handleLogout}
                className="text-yellow-500 cursor-pointer hover:text-yellow-400 hover:underline font-bold rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-800 font-bold  rounded transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-green-500 hover:text-green-800 font-bold rounded transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
