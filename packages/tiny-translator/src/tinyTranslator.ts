import Mustache from 'mustache';

export class TinyTranslator<L extends string> {
    private _locale: L;
    constructor(private locales: L[], private defaultLocale: L) {}

    generate<K extends string>(translations: Record<K, Record<L, string>>) {
        const get = (key: K, data?: any) => {
            let str = translations[key][this._locale];
            return Mustache.render(str, data);
        };

        const locale = (locale: L | null | undefined) => {
            if (this.locales.includes(locale)) {
                this._locale = locale;
            } else {
                this._locale = this.defaultLocale;
            }
            return get;
        };

        return { locale };
    }
}
