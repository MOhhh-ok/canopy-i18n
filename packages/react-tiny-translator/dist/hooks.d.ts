import { GenerateResult } from '@masa-dev/tiny-translator';
export type TranslatorContextType<L extends string> = {
    locale: L;
    setLocale: (locale: L) => void;
};
export declare const TranslatorContext: import("react").Context<TranslatorContextType<any>>;
export declare function useTranslator<K extends string, L extends string>(data: GenerateResult<K, L>): import("@masa-dev/tiny-translator").GetFunction<K>;
export declare function useLocale<L extends string>(): {
    locale: L;
    setLocale: (locale: L) => void;
};
