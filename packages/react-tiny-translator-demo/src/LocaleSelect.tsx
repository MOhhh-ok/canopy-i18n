import { useLocale } from '@masa-dev/react-tiny-translator';

export function LocaleSelect() {
    const { locale, setLocale } = useLocale();
    return <select value={locale} onChange={e => setLocale(e.target.value)}>
        <option value='en'>English</option>
        <option value='ja'>Japanese</option>
    </select>
}