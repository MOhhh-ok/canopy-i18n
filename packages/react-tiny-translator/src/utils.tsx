import { TinyTranslator, TinyTranslatorData } from "@masa-dev/tiny-translator";
import { createContext, useContext } from "react";

// export { TinyTranslator, TinyTranslatorData };

export type TranslatorContextType<L extends string> = {
    translator: TinyTranslator<L>;
    locale: L;
}

export const TranslatorContext = createContext<TranslatorContextType<string>>(null!);

export function useTranslator<K extends string, L extends string>(data: TinyTranslatorData<K, L>) {
    const context = useContext(TranslatorContext);
    const { translator, locale } = context;
    return translator.generate(data).locale(locale);
}

