import { bindLocale } from "canopy-i18n";
import { createContext, useContext, useState } from "react";
import type { Locale } from "./types";

export function useContextStates() {
  const [locale, setLocale] = useState<Locale>("en");
  return { locale, setLocale };
}

export type ContextType = ReturnType<typeof useContextStates>;
export const LocaleContext = createContext<ContextType | undefined>(undefined);

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within a LocaleContext.Provider");
  return context;
};

export function useBindLocale<T extends object>(msgsDef: T) {
  const { locale } = useLocale();
  return bindLocale(msgsDef, locale);
}
