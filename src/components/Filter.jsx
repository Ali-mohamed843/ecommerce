import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '../utils/formatNumber';

const Filter = ({
  categories,
  category,
  setCategory,
  priceRange,
  selectedPriceRange,
  setSelectedPriceRange
}) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
      <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6 transition-all duration-300"
      >

      <h2 className="text-2xl font-bold text-black">
        {t("filterProducts")}
      </h2>

      <div>
        <div>
        <Slider
          range
          min={priceRange.min}
          max={priceRange.max}
          value={selectedPriceRange}
          onChange={(value) => setSelectedPriceRange(value)}
          allowCross={false}
          trackStyle={[{ backgroundColor: '#f97316', height: 6 }]}
          handleStyle={[
            { borderColor: '#f97316', backgroundColor: '#fff', height: 20, width: 20, marginTop: -7 },
            { borderColor: '#f97316', backgroundColor: '#fff', height: 20, width: 20, marginTop: -7 }
          ]}
          railStyle={{ backgroundColor: '#d1d5db', height: 6 }}
        />

        <div className="mt-2 text-black text-sm">
          {t("selectedRange", {
            from: formatNumber(selectedPriceRange[0], isArabic),
            to: formatNumber(selectedPriceRange[1], isArabic),
          })}
        </div>
      </div>

      <div className='mt-3'>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded-lg bg-black text-white w-full shadow focus:outline-none focus:ring-2 focus:ring-white"
        >
          <option value="">{isArabic ? 'الكل' : 'All'}</option>
          {categories.map((cat) => (
            <option key={cat.key} value={cat.key}>
              {isArabic ? cat.ar : cat.en}
            </option>
          ))}
        </select>
      </div>
      </div>

    </div>
  );
};

export default Filter;



