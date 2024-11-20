"use client"

import { createContext, useContext } from "react";
import { GenerateResult } from '@masa-dev/tiny-translator';

// export { TinyTranslator, TinyTranslatorData };

export type TranslatorContextType<L extends string> = {
    locale: L;
    setLocale: (locale: L) => void;
}

export const TranslatorContext = createContext<TranslatorContextType<any>>(null!);

export function useTranslator<K extends string, L extends string>(data: GenerateResult<K, L>) {
    const context = useContext(TranslatorContext) as TranslatorContextType<L>;
    const { locale } = context;
    return data.locale(locale);
}

export function useLocale<L extends string>() {
    const { locale, setLocale } = useContext(TranslatorContext) as TranslatorContextType<L>;
    return { locale, setLocale };
}
