import { TinyTranslatorData } from './index.js';
export declare class TinyTranslator<L extends string> {
    private locales;
    private defaultLocale;
    private _locale;
    constructor(locales: L[], defaultLocale: L);
    generate<K extends string>(translations: TinyTranslatorData<K, L>): {
        locale: (locale: L | null | undefined) => (key: K, data?: any) => string;
    };
}
