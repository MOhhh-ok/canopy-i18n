import { TinyTranslator, TinyTranslatorData } from "@masa-dev/tiny-translator";
export type TranslatorContextType<L extends string> = {
    translator: TinyTranslator<L>;
    locale: L;
};
export declare const TranslatorContext: import("react").Context<TranslatorContextType<string>>;
export declare function useTranslator<K extends string, L extends string>(data: TinyTranslatorData<K, L>): (key: K, data?: any) => string;
//# sourceMappingURL=utils.d.ts.map