"use client";
import { createContext, useContext } from "react";
export const TranslatorContext = createContext(null);
export function useTranslator(data) {
    const context = useContext(TranslatorContext);
    const { locale } = context;
    return data.locale(locale);
}
export function useLocale() {
    const { locale, setLocale } = useContext(TranslatorContext);
    return { locale, setLocale };
}
