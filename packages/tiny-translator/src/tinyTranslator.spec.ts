import { tinyTranslator } from './tinyTranslator';
import { describe, it, expect } from '@jest/globals';

describe('tinyTranslator', () => {
    it('should translate text based on locale', () => {
        const tData = tinyTranslator<'ja' | 'en'>({
            Hello: {
                en: 'Hello, {{name}}',
                ja: 'こんにちは, {{name}}',
            },
            World: {
                en: 'World',
                ja: '世界',
            },
        });

        const tJa = tData.locale('ja');
        expect(tJa('Hello', { name: 'John' })).toBe('こんにちは, John');
        expect(tJa('World')).toBe('世界');

        const tEn = tData.locale('en');
        expect(tEn('Hello', { name: 'John' })).toBe('Hello, John');
        expect(tEn('World')).toBe('World');
    });
});
