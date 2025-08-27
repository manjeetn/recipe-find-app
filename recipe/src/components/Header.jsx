
import { NavLink, useNavigate } from "react-router-dom";

export default function Header({ onAddRecipeClick }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-gray-900 shadow-md">
      <nav className="container mx-auto flex justify-between items-center px-6 py-3">
        {/* Brand */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-orange-500 hover:text-orange-400 transition"
        >
          FlavourFind
        </NavLink>

       
        <div className="flex items-center space-x-6">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `px-3 py-2 transition ${
                isActive
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-200 hover:text-white"
              }`
            }
          >
            Search
          </NavLink>

          {token ? (
            <>
              <button
                onClick={onAddRecipeClick}
                className="relative rounded-lg group px-4 py-2 bg-green-500 hover:bg-green-600
                 text-whiterounded-lg shadow-md transition"
              >
                Add
           <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
            Add a new recipe
         </span>
              </button>

              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `px-3 py-2 transition ${
                    isActive
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                Favourites
              </NavLink>

              <NavLink
                to="/my-recipes"
                className={({ isActive }) =>
                  `relative group px-3 py-2 transition ${
                    isActive
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                 Recipes
             <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
               My Added recipe
            </span>
              </NavLink>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-3 py-2 transition ${
                    isActive
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `px-3 py-2 transition ${
                    isActive
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

