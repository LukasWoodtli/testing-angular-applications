import {browser, by, element, ExpectedConditions as EC} from 'protractor';


describe('adding a new contact with invalid email', () => {
  beforeEach(() => {
    browser.get('/#/add');
    element(by.id('contact-name')).sendKeys('Bad Email');
  });

  it('shouldn\'t create a new contact with bad email', () => {
    let email = element(by.id('contact-email'));
    email.sendKeys('baduser.com');
    element(by.buttonText('Create')).click();

    const invalidEmailModal = element(by.tagName('app-invalid-email-modal'));
    expect(invalidEmailModal.isPresent()).toBe(true);

    const modalButton = invalidEmailModal.element(by.tagName('button'));
    modalButton.click();

    browser.wait(EC.not(
      EC.presenceOf(invalidEmailModal)), 5000);
    expect(invalidEmailModal.isPresent()).toBe(false);

    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/add')
  });
});
