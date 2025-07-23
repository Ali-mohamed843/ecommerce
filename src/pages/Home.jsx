import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Filter from "../components/Filter.jsx";
import { useDebounce } from "react-use";
import Hero from "../components/Hero.jsx";
import { useTranslation } from "react-i18next";
import arDescriptions from "../data/arDescriptions";
import arTitles from "../data/arTitles.js";
import arCategories from "../data/arCategories.js";
import { useCurrency } from "../context/CurrencyContext";
import { AlertCircle } from "react-feather";
import { useToast } from '../context/ToastContext';
import { databases } from '../appwriteConfig';


const Home = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const { t, i18n } = useTranslation();
  const { currency, toggleCurrency } = useCurrency();
  const { showToast } = useToast();
  const [cartCount, setCartCount] = useState(0);
  const [averageRatings, setAverageRatings] = useState({});

 

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const API_URL = "https://fakestoreapi.com/products";

const fetchProducts = async () => {
  setIsLoading(true);
  setErrorMessage("");

  try {

    const res = await fetch(API_URL);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Invalid response");
  
    const ratingsResponse = await databases.listDocuments(
      '687f74bf001cb56191cb', 
      '687f7590001b1d8bbc3c' 
    );
    const ratings = ratingsResponse.documents;

   
    const ratingMap = {};
    ratings.forEach(({ productId, rating }) => {
      if (!ratingMap[productId]) {
        ratingMap[productId] = [];
      }
      ratingMap[productId].push(rating);
    });

 
     const averages = {};
    for (const [productId, ratingsArray] of Object.entries(ratingMap)) {
      const avg = ratingsArray.reduce((a, b) => a + b, 0) / ratingsArray.length;
      averages[productId] = avg;
    }


    const fullData = data.map((product) => ({
      ...product,
      en: {
        title: product.title,
        description: product.description,
        category: product.category,
      },
      ar: {
        title: arTitles[product.id] || product.title,
        description: arDescriptions[product.id] || product.description,
        category: arCategories[product.category] || product.category,
      },
      averageRating: averages[product.id] || 0, 
    }));

    fullData.sort((a, b) => b.averageRating - a.averageRating);

    setProducts(fullData);
    setAverageRatings(averages);

    const uniqueCategories = [...new Set(data.map((item) => item.category))];
    setCategories(uniqueCategories);

    const prices = data.map((item) => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    setPriceRange({ min: minPrice, max: maxPrice });

  } catch (error) {
    console.error("Error fetching products:", error);
    setErrorMessage(t("errorFetching"));
  } finally {
    setIsLoading(false);
  }
};


    const filteredProducts = products.filter((product) => {
      const productRawCategory = product.en.category;
      const matchesCategory = category ? productRawCategory === category : true;
      const title = product[i18n.language]?.title || product.en.title;
      const matchesSearch = debouncedSearchTerm
        ? title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        : true;
      const matchesPrice =
        product.price >= selectedPriceRange[0] &&
        product.price <= selectedPriceRange[1];

      return matchesCategory && matchesSearch && matchesPrice;
    });

    const formattedCategories = categories.map((cat) => ({
    key: cat,
    en: cat,
    ar: arCategories[cat] || cat,
  }));


  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      fetchProducts();
    }
  }, [category]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedPriceRange]);

  useEffect(() => {
  document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
}, [i18n.language]);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800">
      <header className="shadow bg-white sticky top-0 z-50">
        <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedPriceRange={selectedPriceRange}
      />
      </header>

      <section className="px-4 md:px-16 py-10">
        <div className="mb-12">
          <Hero />
        </div>
        <div className="mb-8 flex justify-end">
          <div className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <Filter
            categories={formattedCategories}
            category={category}
            setCategory={setCategory}
            priceRange={priceRange}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
          />
          </div>
        </div>

        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className="text-red-500 text-center">{t("errorFetching")}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                averageRating={product.averageRating}
                onAddToCart={(title) => {
                  showToast(`${title} ${t("addedToCart")}`);
                }}
              />
            ))}
          </div>
        )}
      </section>
      
    </main>
  );
};

export default Home;
