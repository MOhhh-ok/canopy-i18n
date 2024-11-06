export declare function tinyTranslator<L extends string, K extends string>(translations: Record<K, Record<L, string>>): {
    locale: (locale: L) => (key: keyof typeof translations, data?: any) => string;
};
