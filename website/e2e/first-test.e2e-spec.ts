import { browser } from 'protractor';

describe('first protractor test', () => {
  it('should load a page and verify the URL', () => {
    browser.get('/#/');
    const currentUrl = browser.getCurrentUrl();
    expect(currentUrl).toEqual(browser.baseUrl + '/#/');
  });
});
