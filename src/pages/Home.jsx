import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Spinner from '../components/Spinner.jsx';
import ProductCard from "../components/ProductCard.jsx";
import Filter from "../components/Filter.jsx";
import Search from "../components/Search.jsx";
import { useDebounce } from 'react-use';
import Hero from "../components/Hero.jsx";


const Home = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const API_URL = 'https://fakestoreapi.com/products';

  const fetchProducts = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      if (Array.isArray(data)) {
        setProducts(data);

        const uniqueCategories = [...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setErrorMessage('Error fetching products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

    const filteredProducts = products.filter((product) => {
    const matchesCategory = category ? product.category === category : true;
    const matchesSearch = debouncedSearchTerm
        ? product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        : true;
    return matchesCategory && matchesSearch;
    });


  useEffect(() => {
    fetchProducts();
  }, []);

    useEffect(() => {
    if (!searchTerm) {
      fetchProducts();
    }
  }, [category]);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };


  return (
    <main className="min-h-screen bg-gray-50">
      <header>
        <Navbar  
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}  />
      </header>

      <section className="products p-16">
         <div className="hero mb-10">
            <Hero />
         </div>
        <div className="filter mb-6 flex justify-end items-center gap-4">
          <p className="text-lg font-semibold ml-200">Category:</p>
          <Filter
            categories={categories}
            category={category}
            setCategory={setCategory}
          />
        </div>

        
        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className="text-red-500 text-center">{errorMessage}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;