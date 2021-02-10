import en from './en';

const translations = {
  en,
};

export default function (locale) {
  return translations[locale] || en;
}
