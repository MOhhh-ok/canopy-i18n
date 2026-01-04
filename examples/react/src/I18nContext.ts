import { createContext } from "react";
import type { Locale } from "./i18n";
import type { buildI18n } from "./i18n";

export interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: ReturnType<typeof buildI18n>;
}

export const I18nContext = createContext<I18nContextValue | undefined>(undefined);
