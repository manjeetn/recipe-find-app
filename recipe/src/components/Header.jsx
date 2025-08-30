/* import { NavLink, useNavigate } from "react-router-dom";
import { Search, PlusCircle, Heart, BookOpen } from "lucide-react";

export default function Header({ onAddRecipeClick }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header className="hidden md:block fixed top-0 left-0 z-50 w-full bg-gray-900 shadow-md">
        <nav className="container mx-auto flex justify-between items-center px-6 py-3">
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
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
            Search recipes
         </span>
            </NavLink>

            {token ? (
              <>
               <button
                onClick={onAddRecipeClick}
                className="relative rounded-lg group px-4 py-2 bg-green-500 cursor-pointer hover:bg-green-600
                 text-whiterounded-lg shadow-md transition"
              >
                Add
           <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
            Add your recipe
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
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
            Add a new recipe
         </span>
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

      {token && (
        <>
          <header className="md:hidden fixed top-0 left-0 z-50 w-full bg-gray-900 shadow-md flex justify-between items-center px-6 py-3">
            <NavLink to="/" className="text-2xl font-bold text-orange-500">
              FlavourFind
            </NavLink>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Logout
            </button>
          </header>

          <nav className="md:hidden fixed bottom-0 left-0 w-full bg-gray-900 text-white cursor-pointer flex justify-around py-2 shadow-md">
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `flex flex-col items-center ${
                  isActive ? "text-orange-500" : "text-gray-300"
                }`
              }
            >
               <Search size={22} />
    <span className="text-xs">Search</span>
            </NavLink>

            <button
              onClick={onAddRecipeClick}
              className="flex flex-col items-center cursor-pointer text-gray-300 hover:text-orange-500"
            >
             <PlusCircle size={22} />
              <span className="text-xs">Add</span>
            </button>
            <NavLink 
              to="/favorites"
              className={({ isActive }) =>
                `flex flex-col items-center ${
                  isActive ? "text-orange-500" : "text-gray-300"
                }`
              }
            >
              <Heart size={22} />
              <span className="text-xs">Favourites</span>
            </NavLink>

            <NavLink
              to="/my-recipes"
              className={({ isActive }) =>
                `flex flex-col items-center ${
                  isActive ? "text-orange-500" : "text-gray-300"
                }`
              }
            >
                <BookOpen size={22} />
              <span className="text-xs">Recipes</span>
            </NavLink>
          </nav>
        </>
      )}
    </>
  );
}
 */
import { NavLink, useNavigate } from "react-router-dom";
import { Search, PlusCircle, Heart, BookOpen } from "lucide-react";

export default function Header({ onAddRecipeClick }){
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

return (
  <>
    {/* 🌐 Desktop Header */}
    <header className="hidden md:block fixed top-0 left-0 z-50 w-full bg-gray-900 shadow-md">
      <nav className="container mx-auto flex justify-between items-center px-6 py-3">
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
            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
              Search recipes
            </span>
          </NavLink>

          {token ? (
            <>
              <button
                onClick={onAddRecipeClick}
                className="relative rounded-lg group px-4 py-2 bg-green-500 cursor-pointer hover:bg-green-600 text-white shadow-md transition"
              >
                Add
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  Add your recipe
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

    {/* 📱 Mobile Header (always visible) */}
    <header className="md:hidden fixed top-0 left-0 z-50 w-full bg-gray-900 shadow-md flex justify-between items-center px-6 py-3">
      <NavLink to="/" className="text-2xl font-bold text-orange-500">
        FlavourFind
      </NavLink>

      {token ? (
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded-lg"
        >
          Logout
        </button>
      ) : (
        <div className="flex items-center space-x-4">
          <NavLink to="/search" className="text-gray-200 hover:text-orange-500">
            Search
          </NavLink>
          <NavLink to="/login" className="text-gray-200 hover:text-orange-500">
            Login
          </NavLink>
          <NavLink to="/signup" className="text-gray-200 hover:text-orange-500">
            Signup
          </NavLink>
        </div>
      )}
    </header>

    {/* 📱 Mobile Bottom Nav (only if logged in) */}
    {token && (
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-gray-900 text-white flex justify-around py-2 shadow-md">
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-orange-500" : "text-gray-300"
            }`
          }
        >
          <Search size={22} />
          <span className="text-xs">Search</span>
        </NavLink>

        <button
          onClick={onAddRecipeClick}
          className="flex flex-col items-center text-gray-300 hover:text-orange-500"
        >
          <PlusCircle size={22} />
          <span className="text-xs">Add</span>
        </button>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-orange-500" : "text-gray-300"
            }`
          }
        >
          <Heart size={22} />
          <span className="text-xs">Favourites</span>
        </NavLink>

        <NavLink
          to="/my-recipes"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-orange-500" : "text-gray-300"
            }`
          }
        >
          <BookOpen size={22} />
          <span className="text-xs">Recipes</span>
        </NavLink>
      </nav>
    )}
  </>
);
}
