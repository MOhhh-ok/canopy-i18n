import { TinyTranslator, TinyTranslatorData } from '@masa-dev/tiny-translator';

const translator = new TinyTranslator(['en', 'ja'], 'en');

const tData: TinyTranslatorData<string, string> = {
    a: { en: 'a', ja: 'あ' },
    b: { en: 'b', ja: 'い' },
};

const tData2 = translator.generate(tData);
const t = tData2.locale('en');
console.log(t('a'));
