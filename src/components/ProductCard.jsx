import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { useCurrency } from "../context/currencyContext";
import { formatNumber } from '../utils/formatNumber';


const ProductCard = ({ product, onAddToCart }) => {
  const { dispatch } = useCart();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { currency } = useCurrency();


  const title = product[i18n.language]?.title || product.title;
  const description = product[i18n.language]?.description || product.description;
  const category = product[i18n.language]?.category || product.category;

  const overview = showFullDescription
    ? description
    : `${description?.substring(0, 70)}...`;

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: "ADD_TO_CART", payload: product }); 
    if (onAddToCart) {
      onAddToCart(title);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col">
      <img
        src={product.image}
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
              {showFullDescription ? t("showLess") : t("readMore")}
            </button>
          </p>
        </div>

        <div className="mt-auto">
          <p className="text-lg font-bold text-black-800 mb-3">
            {currency === "USD"
              ? `${formatNumber(product.price)} $`
              : `${formatNumber(product.price * 50)} ${t("egp")}`}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-yellow-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-200 w-full"
          >
            {t("addToCart")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

