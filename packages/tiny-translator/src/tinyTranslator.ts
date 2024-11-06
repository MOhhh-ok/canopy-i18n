import Mustache from 'mustache';

export default function tinyTranslator<L extends string>(
    translations: Record<string, Record<L, string>>
): {
    locale: (
        locale: L
    ) => (key: keyof typeof translations, data?: any) => string;
    get: (key: keyof typeof translations, data?: any) => string;
} {
    let _locale: L;

    const get = (key: keyof typeof translations, data?: any) => {
        let str = translations[key][_locale];
        return Mustache.render(str, data);
    };

    const locale = (locale: L) => {
        _locale = locale;
        return get;
    };

    return { locale, get };
}
