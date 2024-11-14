"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinyTranslator = void 0;
const mustache_1 = __importDefault(require("mustache"));
class TinyTranslator {
    constructor(locales, defaultLocale) {
        this.locales = locales;
        this.defaultLocale = defaultLocale;
    }
    generate(translations) {
        const get = (key, data) => {
            let str = translations[key][this._locale];
            return mustache_1.default.render(str, data);
        };
        const locale = (locale) => {
            if (this.locales.includes(locale)) {
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
exports.TinyTranslator = TinyTranslator;
//# sourceMappingURL=TinyTranslator.js.map