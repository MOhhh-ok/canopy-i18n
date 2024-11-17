import { createContext, useContext } from "react";
import { GenerateResult } from '@masa-dev/tiny-translator';

// export { TinyTranslator, TinyTranslatorData };

export type TranslatorContextType<L extends string> = {
    locale: L;
}

export const TranslatorContext = createContext<TranslatorContextType<string>>(null!);

export function useTranslator<K extends string, L extends string>(data: GenerateResult<K, L>) {
    const context = useContext(TranslatorContext) as TranslatorContextType<L>;
    const { locale } = context;
    return data.locale(locale);
}

