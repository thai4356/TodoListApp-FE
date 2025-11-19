import i18nResources from './locales';

describe('test i18n key', () => {
  it('all key should be equal', () => {
    const enTransKey = Object.keys(i18nResources.en.translation);
    const viTransKey = Object.keys(i18nResources.vi.translation);
    expect(enTransKey.length).toEqual(viTransKey.length);
    expect(enTransKey).toEqual(viTransKey);
  });
});
