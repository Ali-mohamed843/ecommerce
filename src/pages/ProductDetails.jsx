import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useToast } from '../context/ToastContext';
import { databases, ID } from '../appwriteConfig';
import { Permission, Role } from 'appwrite';
import { useCurrency } from "../context/CurrencyContext";
import { useTranslation } from 'react-i18next';
import arTitles from '../data/arTitles';
import arDescriptions from '../data/arDescriptions';
import arCategories from '../data/arCategories';
import { formatNumber } from '../utils/formatNumber';
import Spinner from '../components/Spinner';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { showToast } = useToast();
  const [hasRated, setHasRated] = useState(false);
  const { currency, toggleCurrency } = useCurrency();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const { dispatch } = useCart();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);


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



  const submitRating = async (value) => {
    if (!rating) return;

    try {
      await databases.createDocument(
        '687f74bf001cb56191cb',
        '687f7590001b1d8bbc3c',
        ID.unique(),
        {
          productId: id,
          userId: 'anonymous',
          rating: value,
        },
        [
          Permission.read(Role.any()),
          Permission.write(Role.any())
        ]
      );
      showToast(t("thanksForRating"));
      setHasRated(true);
      setRating(value);
    } catch (error) {
      console.error("Rating failed:", error.message, error.code, error.response);
      showToast("Failed to submit rating.");
    }
  };

  const productId = Number(product.id);

  const translatedTitle = isArabic ? arTitles[productId] || product.title : product.title;
  const translatedDescription = isArabic ? arDescriptions[productId] || product.description : product.description;
  const translatedCategory = isArabic ? arCategories[product.category] || product.category : product.category;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: "ADD_TO_CART", payload: product });
    showToast(`${product.title} added to cart`);
  };

  if (isLoading) return <Spinner />;
  if (errorMessage) return <p className="text-center mt-20 text-red-500">{t('errorFetching')}</p>;

  return (
    <div>
      <Navbar />
      <div className={`productDetails flex flex-col ${isArabic ? 'md:flex-row-reverse' : 'md:flex-row'} gap-20 justify-center items-center py-10 px-6 mt-50`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-90 object-contain bg-gray-100 rounded-lg shadow"
        />
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold mb-4 text-orange-700">{translatedTitle}</h2>
          <p className="text-gray-600 mb-2 capitalize">
            <span className="font-semibold">{t("category")}: </span>{translatedCategory}
          </p>
          <p className="text-gray-700 mb-6">
            <span className="font-semibold">{t("description")}: </span>{translatedDescription}
          </p>
          <p className="text-2xl font-bold text-orange-600 mb-3">
            {currency === "USD"
              ? `${formatNumber(product.price)} $`
              : `${formatNumber(product.price * 50)} ${t("egp")}`}
          </p>
          <div>
          <div className="mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    if (!hasRated) {
                      setRating(star);
                      submitRating(star);
                    }
                  }}
                  onMouseEnter={() => !hasRated && setHover(star)}
                  onMouseLeave={() => !hasRated && setHover(0)}
                  className={`text-3xl transition-all duration-200 ${
                    (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                  } ${hasRated ? 'cursor-default' : 'hover:scale-110 hover:text-yellow-500'}`}
                  disabled={hasRated}
                  aria-label={`${star} ${t('star', { count: star })}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-yellow-600 mt-4 text-white text-sm px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-200 w-full"
          >
            {t('addToCart')}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
