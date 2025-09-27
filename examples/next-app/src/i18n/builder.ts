import { createI18n } from 'canopy-i18n';

export const locales = ['ja', 'en'] as const;
export type AppLocale = typeof locales[number];

export const builder = createI18n(locales, 'ja');


