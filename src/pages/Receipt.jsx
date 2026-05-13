import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCurrency } from '../context/currencyContext';
import { useTranslation } from 'react-i18next';
import arTitles from '../data/arTitles';
import { formatNumber } from '../utils/formatNumber';

const Receipt = () => {
  const location = useLocation();
  const order = location.state?.order || { cart: [], name: '', email: '', address: '' };
  const { currency } = useCurrency();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const convert = (price) => {
    const numericPrice = Number(price);
    if (isNaN(numericPrice)) return '0.00';
    return currency === 'EGP'
      ? (numericPrice * 50).toFixed(2)
      : numericPrice.toFixed(2);
  };

  const symbol = currency === "EGP" ? "EGP" : "$";
  const total = order.cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow rounded-lg mt-40">
        <h2 className="text-3xl font-bold text-orange-500 mb-6">{t('receipt')}</h2>

        <p><strong>{t('name')}:</strong> {order.name}</p>
        <p><strong>{t('email')}:</strong> {order.email}</p>
        <p><strong>{t('address')}:</strong> {order.address}</p>

        <div className="mt-6 space-y-4">
          {order.cart.map(item => (
            <div key={item.id} className="flex justify-between pb-1">
              <span className='text-gray-600'>
                {isArabic ? arTitles[item.id] || item.title : item.title} × {formatNumber(item.quantity, { minimumFractionDigits: 0 })}
              </span>
              <span>{formatNumber(convert(Number(item.price) * item.quantity))} {symbol}</span>
            </div>
          ))}
        </div>

        <h3 className="mt-6 text-xl font-semibold">
          {t('total')}: <span className="text-orange-500">{symbol} {formatNumber(convert(total))}</span>
        </h3>
      </div>
    </div>
  );
};

export default Receipt;
