import * as Mustache from 'mustache';
import { TinyTranslatorData } from './index';

export class TinyTranslator<L extends string> {
    private _locale: L | null | undefined;
    constructor(private locales: L[], private defaultLocale: L) {}

    generate<K extends string>(translations: TinyTranslatorData<K, L>) {
        const get = (key: K, data?: any) => {
            let str = translations[key][this._locale ?? this.defaultLocale];
            return Mustache.render(str, data);
        };

        const locale = (locale: L | null | undefined) => {
            if (this.locales.includes(locale ?? this.defaultLocale)) {
                this._locale = locale;
            } else {
                this._locale = this.defaultLocale;
            }
            return get;
        };

        return { locale };
    }
}
