"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinyTranslator = void 0;
const Mustache = __importStar(require("mustache"));
class TinyTranslator {
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
exports.TinyTranslator = TinyTranslator;
