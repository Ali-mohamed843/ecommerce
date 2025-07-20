import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { dispatch } = useCart();

  const API_URL = `https://fakestoreapi.com/products/${id}`;

  const fetchProduct = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (data && data.id) {
        setProduct(data);
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setErrorMessage('Error fetching product. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  if (isLoading) return <p className="text-center mt-20 text-gray-500">Loading...</p>;
  if (errorMessage) return <p className="text-center mt-20 text-red-500">{errorMessage}</p>;

  return (
    <div>
      <Navbar />
      <div className="productDetails flex flex-col md:flex-row gap-20 justify-center items-center py-10 px-6 mt-50">
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-64 object-contain bg-gray-100 rounded-lg shadow"
        />
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold mb-4 text-orange-700">{product.title}</h2>
          <p className="text-gray-600 mb-2 capitalize">{product.category}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <p className="text-xl font-semibold text-orange-600">${product.price}</p>
          <div>
          <button
            onClick={handleAddToCart}
            className="bg-yellow-600 mt-4 text-white text-sm px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-200 w-full"
          >
            Add to Cart
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
