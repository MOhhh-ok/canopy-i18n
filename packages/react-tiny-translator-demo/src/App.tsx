import { TinyTranslator } from '@masa-dev/tiny-translator'
import { TranslatorProvider, useTranslator } from '@masa-dev/react-tiny-translator'
import './App.css'

const translator = new TinyTranslator(['en', 'ja'], 'en');
const tData = translator.generate({
    a: {
        en: 'a',
        ja: 'あ'
    },
    b: {
        en: 'b',
        ja: 'い'
    }
});

function App() {
    return <TranslatorProvider locale='en' >
        <Child />
    </TranslatorProvider>
    // return <TranslatorProvider locale='en' translator={translator}>
    //     <Child />
    // </TranslatorProvider>
}

function Child() {
    const a = useTranslator(tData);
    return a('a');
    // return <div>{a('locale')}</div>
    return 'a';
}

export default App
