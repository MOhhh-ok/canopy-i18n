"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslatorProvider = TranslatorProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("./utils");
function TranslatorProvider(props) {
    const { locale } = props;
    return (0, jsx_runtime_1.jsx)(utils_1.TranslatorContext.Provider, { value: { locale }, children: props.children });
}
