import i18n from '../i18n';

export function formatNumber(number, options = {}) {
  const lang = i18n.language || 'en';
  const num = Number(number);
  if (isNaN(num)) return '0.00';

  return new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(num);
}

