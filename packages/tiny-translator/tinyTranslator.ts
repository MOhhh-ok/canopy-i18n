import Mustache from 'mustache';

export function tinyTranslator<L extends string>(
    translations: Record<string, Record<L, string>>
) {
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
