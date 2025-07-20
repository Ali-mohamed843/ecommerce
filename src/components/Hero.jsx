const Hero = () => {
  return (
    <section className="py-20 px-4 mt-20 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-600 mb-6 leading-tight">
            Discover the Best Deals on Fashion & More!
          </h1>
          <p className="text-gray-700 text-base sm:text-lg mb-8">
            Shop our latest collection and enjoy free shipping, exclusive discounts, and unbeatable prices.
          </p>
          <a
            href="#products"
            className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-700 transition"
          >
            Shop Now
          </a>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="./jacket.jpg"
            alt="Shopping"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-3xl shadow-lg"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;

