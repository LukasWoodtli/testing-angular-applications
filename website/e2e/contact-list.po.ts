import {browser, by, element, ElementFinder} from 'protractor';
import {NewContactPageObject} from "./new-contact.po";


export class ContactListPageObject {
  plusButton: ElementFinder;

  constructor() {
    this.plusButton = element(by.id('add-contact'));
  }

  clickPlusButton() {
    this.plusButton.click();
    return new NewContactPageObject();
  }

  navigateTo() {
    browser.get('/#/');
  }

}
