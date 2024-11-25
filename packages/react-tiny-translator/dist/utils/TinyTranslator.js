import Mustache from 'mustache';
export class TinyTranslator {
    locales;
    defaultLocale;
    _locale;
    constructor(locales, defaultLocale) {
        this.locales = locales;
        this.defaultLocale = defaultLocale;
    }
    generate(translations) {
        const get = (key, data) => {
            let str = translations[key][this._locale ?? this.defaultLocale];
            return Mustache.render(str, data);
        };
        const locale = (locale) => {
            if (this.locales.includes(locale ?? this.defaultLocale)) {
                this._locale = locale;
            }
            else {
                this._locale = this.defaultLocale;
            }
            return get;
        };
        return { locale };
    }
}
