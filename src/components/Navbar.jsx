import { FaShoppingCart } from 'react-icons/fa';
import Search from './Search';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCurrency } from "../context/CurrencyContext";

const Navbar = ({ searchTerm, setSearchTerm, selectedPriceRange, showEgp, setShowEgp }) => {
  const { cartCount } = useCart();
  const { currency, toggleCurrency } = useCurrency();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.body.dir = newLang === 'ar' ? 'rtl' : 'ltr'; 
  };
  const isArabic = i18n.language === 'ar';

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full px-4 md:px-8 py-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 z-50">
      <div className="flex items-center justify-center md:justify-start gap-2 text-orange-600 text-2xl font-bold">
        <FaShoppingCart className="text-3xl" />
        <span className="tracking-wide">{isArabic ? 'متجري' : 'EShop'}</span>
      </div>


      <div className="w-full md:max-w-md">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <ul className="flex justify-center md:justify-end items-center space-x-4 md:space-x-8 text-base font-medium text-gray-700">
        <li>
          <button onClick={toggleCurrency} className='px-3 py-1 bg-orange-100 hover:bg-orange-200 rounded-md text-sm font-semibold'>
            {currency === "USD" ? "Switch to EGP" : "Switch to USD"}
          </button>
        </li>
        <li>
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-semibold"
          >
            {i18n.language === 'en' ? 'AR' : 'EN'}
          </button>
        </li>
        <li>
          <Link to="/" className="hover:text-orange-600 pb-1 hover:border-b-2">{t("home")}</Link>
        </li>
        <li>
          <Link to="/checkout" className="hover:text-orange-600 pb-1 hover:border-b-2">{t("checkout")}</Link>
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

