import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: 'CLEAR_CART' });

    navigate('/receipt', {
      state: {
        order: {
          name,
          email,
          address,
          cart,
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <Navbar />
      
      {cart.length === 0 ? (
        <div className="text-center text-xl text-gray-600 mt-10">Cart is empty</div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-8 w-full max-w-md space-y-6 mt-6">
          <h2 className="text-3xl font-bold text-center text-orange-500 tracking-wide">Checkout</h2>

          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 text-sm font-semibold mb-1">Full Name</label>
            <input
              type="text"
              placeholder='Enter your full name'
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder='Enter your email'
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="address" className="text-gray-700 text-sm font-semibold mb-1">Address</label>
            <input
              type="text"
              placeholder='Enter your address'
              id="address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-200 font-semibold text-lg"
          >
            Submit Order
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;


