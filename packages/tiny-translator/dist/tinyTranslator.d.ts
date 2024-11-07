export declare class TinyTranslator<L extends string> {
    private locales;
    private defaultLocale;
    private _locale;
    constructor(locales: L[], defaultLocale: L);
    generate<K extends string>(translations: Record<K, Record<L, string>>): {
        locale: (locale: L | null | undefined) => (key: K, data?: any) => string;
    };
}
