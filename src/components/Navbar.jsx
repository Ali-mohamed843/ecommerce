import { FaShoppingCart } from 'react-icons/fa';
import Search from './Search';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { cartCount } = useCart();

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full px-4 md:px-8 py-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 z-50">
      <div className="text-3xl font-semibold text-orange-600 text-center md:text-left">E-Shop</div>

      <div className="w-full md:max-w-md">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <ul className="flex justify-center md:justify-end items-center space-x-4 md:space-x-8 text-base font-medium text-gray-700">
        <li>
          <Link to="/" className="hover:text-orange-600">Home</Link>
        </li>
        <li>
          <Link to="/checkout" className="hover:text-orange-600">Checkout</Link>
        </li>
        <li>
          <Link to="/cart" className="relative text-gray-700 hover:text-orange-600 transition duration-200 cursor-pointer">
            <FaShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;




