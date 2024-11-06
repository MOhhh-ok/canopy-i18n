export declare function tinyTranslator<L extends string>(translations: Record<string, Record<L, string>>): {
    locale: (locale: L) => (key: keyof typeof translations, data?: any) => string;
    get: (key: keyof typeof translations, data?: any) => string;
};
