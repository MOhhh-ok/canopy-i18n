import { TinyTranslator } from '@masa-dev/tiny-translator';

const locales = ['en', 'ja'];
const defaultLocale = 'en';

export const translator = new TinyTranslator(locales, defaultLocale);
