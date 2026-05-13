import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTimes } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { useCurrency } from '../context/currencyContext';
import { useTranslation } from 'react-i18next';
import arTitles from '../data/arTitles';
import { formatNumber } from '../utils/formatNumber';

const Cart = () => {
  const { cart, dispatch } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const { currency } = useCurrency();
  const convert = (price) => {
    const numericPrice = Number(price); 
    if (isNaN(numericPrice)) return '0.00';
    return currency === 'EGP'
      ? (numericPrice * 50).toFixed(2)
      : numericPrice.toFixed(2);
  };
  const symbol = currency === 'EGP' ? 'EGP' : '$';
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-30">
          {isArabic ? 'عربة التسوق' : 'Your Cart'}
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-lg">
            {isArabic ? 'سلة التسوق فارغة حالياً.' : 'Your cart is currently empty.'}
          </p>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item) => {
                const productId = Number(item.id);
                const translatedTitle =
                  isArabic ? arTitles[productId] || item.title : item.title;

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-6 bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-contain bg-gray-100 rounded"
                    />

                    <div className="flex-grow">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {translatedTitle}
                      </h4>
                      <p className="text-xl font-bold text-orange-600 mb-5">
                        {formatNumber(convert(item.price))} {symbol}
                      </p>
                      <div className="flex items-center mt-2 gap-2">
                        <button
                          onClick={() =>
                            dispatch({ type: 'DECREASE_QUANTITY', payload: item.id })
                          }
                          className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        >
                          −
                        </button>
                        <span className="px-3 text-gray-800 font-medium">{formatNumber(item.quantity)}</span>
                        <button
                          onClick={() =>
                            dispatch({ type: 'INCREASE_QUANTITY', payload: item.id })
                          }
                          className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                        <button
                          onClick={() =>
                            dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })
                          }
                          className="ml-auto text-red-500 mr-10 hover:text-red-700 text-lg"
                          title={isArabic ? 'إزالة العنصر' : 'Remove item'}
                        >
                          <FaTimes className="text-2xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex justify-between items-center border-gray-200 pt-6">
              <Link
                to="/checkout"
                className="bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-orange-700 transition-all duration-300 text-lg"
              >
                {isArabic ? 'الدفع' : 'Checkout'}
              </Link>
              <h3 className="text-2xl font-semibold text-gray-800">
                {isArabic ? 'الإجمالي:' : 'Total:'}{' '}
              <span className="text-orange-500">
                {symbol} {formatNumber(convert(total))}
              </span>
              </h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;


