import {browser, by, element} from "protractor";


describe('adding a new contact with name, email and phone number', () => {
  beforeAll(() => {
    browser.get('/#/');
    element(by.id('add-contact')).click();
    element(by.id('contact-name')).sendKeys('Grace');
  });

  it('should type in an email address', () => {
    let email = element(by.id('contact-email'));
    email.sendKeys('grace@hopper.org');
    expect(email.getAttribute('value'))
      .toEqual('grace@hopper.org');
  });

  it('should type in an phone number', () => {
    let tel = element(by.css('input[type="tel"]'));
    tel.sendKeys('1234567890');
    expect(tel.getAttribute('value'))
      .toEqual('1234567890');
  });



  it('should click the create button', () => {
    element(by.css('.create-button')).click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/');
  });
});
