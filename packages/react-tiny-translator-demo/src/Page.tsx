import { useTranslator } from '@masa-dev/react-tiny-translator';
import { translator } from './translator';

const tData = translator.generate({
    title: {
        en: 'My Page',
        ja: 'マイページ'
    },
    description: {
        en: "This is {{name}}'s page.",
        ja: 'これは{{name}}のページです。'
    }
});

export function Page() {
    const t = useTranslator(tData);
    return <div>
        <h1>{t('title')}</h1>
        <p>{t('description', { name: 'John' })}</p>
    </div>
}
