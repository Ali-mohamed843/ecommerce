import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Receipt = () => {
  const location = useLocation();
  const order = location.state?.order || { cart: [], name: '', email: '', address: '' };

  console.log("RECEIVED ORDER:", order);

  const total = order.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <Navbar />
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow rounded-lg mt-40">
      <h2 className="text-3xl font-bold text-orange-500 mb-6">Receipt</h2>
      <p><strong>Name:</strong> {order.name}</p>
      <p><strong>Email:</strong> {order.email}</p>
      <p><strong>Address:</strong> {order.address}</p>

      <div className="mt-6 space-y-4">
        {order.cart.map(item => (
          <div key={item.id} className="flex justify-between pb-1">
            <span className='text-gray-600'>{item.title} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <h3 className="mt-6 text-xl font-semibold">
        Total: <span className="text-orange-500">${total.toFixed(2)}</span>
      </h3>
    </div>
    </div>
  );
};

export default Receipt;
