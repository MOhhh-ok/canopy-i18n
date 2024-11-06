import Mustache from 'mustache';
export function tinyTranslator(translations) {
    let _locale;
    const get = (key, data) => {
        let str = translations[key][_locale];
        return Mustache.render(str, data);
    };
    const locale = (locale) => {
        _locale = locale;
        return get;
    };
    return { locale, get };
}
//# sourceMappingURL=tinyTranslator.js.map