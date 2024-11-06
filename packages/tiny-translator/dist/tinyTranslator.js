"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tinyTranslator;
var mustache_1 = __importDefault(require("mustache"));
function tinyTranslator(translations) {
    var _locale;
    var get = function (key, data) {
        var str = translations[key][_locale];
        return mustache_1.default.render(str, data);
    };
    var locale = function (locale) {
        _locale = locale;
        return get;
    };
    return { locale: locale, get: get };
}
//# sourceMappingURL=tinyTranslator.js.map