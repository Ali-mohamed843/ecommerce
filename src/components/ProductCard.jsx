import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onAddToCart }) => {
  const { dispatch } = useCart();
  const {
    id,
    title,
    price,
    description,
    category,
    image,
  } = product;

  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const overview = showFullDescription
    ? description
    : `${description?.substring(0, 70)}...`;

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

   const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: "ADD_TO_CART", payload: product }); 
    if (onAddToCart) {
      onAddToCart(); 
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-contain bg-gray-100 p-4"
        onClick={handleClick}
      />

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div className="mb-4">
          <h3 onClick={handleClick} className="text-lg font-semibold text-gray-800 line-clamp-1">
            {title}
          </h3>
          <p onClick={handleClick} className="text-sm text-gray-500 mb-1 capitalize">{category}</p>
          <p onClick={handleClick} className="text-gray-700 text-sm">
            {overview}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowFullDescription(!showFullDescription);
              }}
              className="text-orange-600 font-bold text-md ml-1 hover:underline"
            >
              {showFullDescription ? 'Show less' : 'Read more'}
            </button>
          </p>
        </div>

        <div className="mt-auto">
          <p className="text-xl font-bold text-orange-600 mb-5">
            {price} <span className='ml-1'>$</span>
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-yellow-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-200 w-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;