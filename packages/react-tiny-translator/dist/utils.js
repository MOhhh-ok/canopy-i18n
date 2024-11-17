"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslatorContext = void 0;
exports.useTranslator = useTranslator;
const react_1 = require("react");
exports.TranslatorContext = (0, react_1.createContext)(null);
function useTranslator(data) {
    const context = (0, react_1.useContext)(exports.TranslatorContext);
    const { locale } = context;
    return data.locale(locale);
}
