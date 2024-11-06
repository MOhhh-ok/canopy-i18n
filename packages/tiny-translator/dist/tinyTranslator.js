"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tinyTranslator = tinyTranslator;
const mustache_1 = __importDefault(require("mustache"));
function tinyTranslator(translations) {
    let _locale;
    const get = (key, data) => {
        let str = translations[key][_locale];
        return mustache_1.default.render(str, data);
    };
    const locale = (locale) => {
        _locale = locale;
        return get;
    };
    return { locale };
}
//# sourceMappingURL=tinyTranslator.js.map