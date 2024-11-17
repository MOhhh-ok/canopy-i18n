import { jsx as _jsx } from "react/jsx-runtime";
import { TranslatorContext } from './utils.js';
export function TranslatorProvider(props) {
    const { locale, setLocale } = props;
    return _jsx(TranslatorContext.Provider, { value: { locale, setLocale }, children: props.children });
}
