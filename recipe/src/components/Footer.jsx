/* 
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 p-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-between text-sm mb-6">
          <div className="px-2">
            <h2 className="text-xl font-bold text-orange-400">FlavourFind</h2>
          </div>

          <div className="px-2">
            <h3 className="font-semibold text-white mb-2 uppercase">Visit Us</h3>
            <p>123 New delhi, Delhi</p>
            <p>Foodie City, 110003</p>
          </div>

          <div className="px-2">
            <h3 className="font-semibold text-white mb-2 uppercase">Contact us</h3>
            <p>+91 9998859369</p>
            <p>contact@flavourfind.com</p>
          </div>

          <div className="px-2">
            <h3 className="font-semibold text-white mb-2 uppercase">Explore</h3>
            <ul>
              <li><Link to="/search" className="hover:text-orange-400 hover:underline">Search</Link></li>
              <li><Link to="/favorites" className="hover:text-[#facc15] hover:underline">Favourites</Link></li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-2" />

        <div className="flex justify-center items-center text-xs">
          <p>
            &copy; {new Date().getFullYear()} FlavourFind. All rights reserved.
          </p>
         
        </div>
      </div>
    </footer>
  );
}
 */
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 p-4 mt-auto pb-16 shadow-md">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row md:justify-between text-sm mb-6 gap-6 md:gap-0">
          
          <div className="px-2 text-center md:text-left">
            <h2 className="text-xl font-bold text-orange-400">FlavourFind</h2>
          </div>

          <div className="px-2 text-center md:text-left">
            <h3 className="font-semibold text-white mb-2 uppercase">Visit Us</h3>
            <p>123 New delhi, Delhi</p>
            <p>Foodie City, 110003</p>
          </div>

          <div className="px-2 text-center md:text-left">
            <h3 className="font-semibold text-white mb-2 uppercase">Contact Us</h3>
            <p>+91 9998859369</p>
            <p>contact@flavourfind.com</p>
          </div>

          <div className="px-2 text-center md:text-right">
            <h3 className="font-semibold text-white mb-2 uppercase">Explore</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/search" className="hover:text-orange-400 hover:underline">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-[#facc15] hover:underline">
                  Favourites
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-2" />

        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center text-xs gap-3">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} FlavourFind. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
