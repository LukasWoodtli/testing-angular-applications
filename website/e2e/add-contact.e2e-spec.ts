import {browser, by, element} from "protractor";


describe('adding a new contact with only name', () => {
  beforeAll(() => {
    browser.get('/#/');
  });

  it('should find the add contact button', () => {
    element(by.id('add-contact')).click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/add');
  });

  it('should write a name', () => {
    let contactName = element(by.id('contact-name'));
    contactName.sendKeys('Ada');
    expect(contactName.getAttribute('value')).toEqual('Ada');
  });

  it('should click the create button', () => {
    element(by.css('.create-button')).click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/');
  });
});
