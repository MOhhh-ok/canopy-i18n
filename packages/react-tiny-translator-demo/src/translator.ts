import { TinyTranslator } from '@masa-dev/react-tiny-translator/utils';

const locales = ['en', 'ja'];
const defaultLocale = 'en';

export const translator = new TinyTranslator(locales, defaultLocale);
