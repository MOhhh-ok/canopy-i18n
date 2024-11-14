import { createContext, useContext } from "react";
export const TranslatorContext = createContext(null);
export function useTranslator(data) {
    const context = useContext(TranslatorContext);
    const { translator, locale } = context;
    return translator.generate(data).locale(locale);
}
//# sourceMappingURL=utils.js.map