import { TinyTranslator } from '@masa-dev/tiny-translator';

const locales = ['ja', 'en'];
const defaultLocale = 'ja';

// Export instance with locales and defaul locale
export const translator = new TinyTranslator(locales, defaultLocale);
