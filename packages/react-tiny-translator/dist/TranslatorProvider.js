import { jsx as _jsx } from 'react/jsx-runtime';
import { TranslatorContext } from './utils.js';
export function TranslatorProvider(props) {
    const { locale, translator } = props;
    return _jsx(TranslatorContext.Provider, {
        value: { translator: translator, locale },
        children: props.children,
    });
}
//# sourceMappingURL=TranslatorProvider.js.map
