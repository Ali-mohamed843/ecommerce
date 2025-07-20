import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Checkout from './Checkout';
import { FaTimes } from 'react-icons/fa';
import Navbar from '../components/Navbar';


const Cart = () => {
  const { cart, dispatch } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <Navbar />
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-30">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is currently empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-6 bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              >
                <img src={item.image} alt={item.title} className="w-24 h-24 object-contain bg-gray-100 rounded" />

                <div className="flex-grow">
                  <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => dispatch({ type: "DECREASE_QUANTITY", payload: item.id })}
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="px-3 text-gray-800 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => dispatch({ type: "INCREASE_QUANTITY", payload: item.id })}
                      className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
                      className="ml-auto text-red-500 mr-10 hover:text-red-700 text-lg"
                      title="Remove item"
                    >
                      <FaTimes className='text-2xl' />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-between items-center border-gray-200 pt-6">
            <Link to="/checkout" className="bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-orange-700 transition-all duration-300 text-lg">Checkout</Link>
            <h3 className="text-2xl font-semibold text-gray-800">
              Total: <span className="text-orange-500">${total.toFixed(2)}</span>
            </h3>
          </div>
        </>
      )}
    </div>
    </div>

  );
};

export default Cart;

