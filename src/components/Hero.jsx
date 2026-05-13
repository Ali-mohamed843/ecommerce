import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <section className="py-20 px-4 mt-20 md:px-12">
      <div dir="ltr" className={`max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10`}>
        {isArabic ? (
          <>
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src="./jacket.jpg"
                alt={t("heroImageAlt")}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-3xl shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 text-right" dir="rtl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-600 mb-6 leading-tight">
                {t("heroTitle")}
              </h1>
              <p className="text-gray-700 text-base sm:text-lg mb-8">
                {t("heroDescription")}
              </p>
              <a
                href="#products"
                className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-700 transition"
              >
                {t("shopNow")}
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="w-full md:w-1/2 text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-600 mb-6 leading-tight">
                {t("heroTitle")}
              </h1>
              <p className="text-gray-700 text-base sm:text-lg mb-8">
                {t("heroDescription")}
              </p>
              <a
                href="#products"
                className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-700 transition"
              >
                {t("shopNow")}
              </a>
            </div>
            <div className={`w-full md:w-1/2 flex justify-center ${isArabic ? "md:order-1" : "md:order-2"}`}>
              <img
                src="./jacket.jpg"
                alt={t("heroImageAlt")}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-3xl shadow-lg"
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;






