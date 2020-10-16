import {ContactListPageObject} from './contact-list.po';
import {NewContactPageObject} from './new-contact.po';
import {browser} from 'protractor';


describe('contact list', () => {
  let contactList: ContactListPageObject;
  let newContact: NewContactPageObject;

  beforeAll(() => {
    contactList = new ContactListPageObject();
  });

  describe('add a new contact', () => {
    beforeAll(() => {
      contactList.navigateTo();
    });

    it('should click the + button', () => {
      newContact = contactList.clickPlusButton();
      expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '/#/add');
    });

    it('should fill out the form for a new contact', () => {
      newContact.setContactInfo(
        'Mr. Newton', 'mr.newton@example.com', null);
      expect(newContact.getName()).toBe('Mr. Newton');
      expect(newContact.getEmail()).toBe('mr.newton@example.com');
      expect(newContact.getPhone()).toBe('');
    });

    it('should click the create button', () => {
      contactList = newContact.clickCreateButton();
      expect(browser.getCurrentUrl()).toBe(browser.baseUrl + '/#/');
    });
  });
});
