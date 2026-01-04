import { useState } from "react";
import type { ReactNode } from "react";
import { buildI18n, type Locale } from "./i18n";
import { I18nContext } from "./I18nContext";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const messages = buildI18n(locale);

  return (
    <I18nContext.Provider value={{ locale, setLocale, messages }}>
      {children}
    </I18nContext.Provider>
  );
}
