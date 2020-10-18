import {browser, by, element, WebElement} from 'protractor';


describe('Testing with timeouts', () => {
  it('should be able to login (with waitForAngularEnabled)', () => {
    browser.waitForAngularEnabled(false);
    browser.get('/assets/login.html')
    element(by.css('input.user')).sendKeys('username');
    element(by.css('input.password')).sendKeys('password');
    element(by.id('login')).click();

    browser.waitForAngularEnabled(true);
    const list = element(by.css('app-contact-list tr'));
    expect(list.getText()).toContain('Name Email Number');
  });

  it('should be able to login (with ExpectedConditions)', () => {
    let EC = browser.ExpectedConditions;
    browser.waitForAngularEnabled(false);
    browser.get('/assets/login.html');
    element(by.css('input.user')).sendKeys('username');
    element(by.css('input.password')).sendKeys('password');
    element(by.id('login')).click();

    const list = element(by.css('app-contact-list'));
    const listReady = EC.not(EC.textToBePresentInElement(list, 'Loading contacts'));
    browser.wait(listReady, 5000, 'Wait for list to load');

    expect(list.getText()).toContain('Name Email Number');
  });
});

describe('Feed dialog', () => {

  let EC;
  beforeEach(() => {
    browser.get('/#/contact/4');
    EC = browser.ExpectedConditions;
  });

  it('should open the dialog with expected conditions', () => {
    browser.waitForAngularEnabled(false);

    const feedButton = element(by.css('button.feed-button'));
    browser.wait(EC.elementToBeClickable(feedButton),
      3000, 'waiting for feed button to be clickable');
    feedButton.click();

    const dialogTitle = element(by.css('app-contact-feed h2.mat-dialog-title'));
    browser.wait(EC.visibilityOf(dialogTitle),
      1000, 'waiting for dialog title to appear');
    expect(dialogTitle.getText()).toContain('Latest posts from Craig Service');

    const closeButton = element(by.css('button[mat-dialog-close'));
    closeButton.click();
    /* A stale element (in WebDriver tests) is one that you can have a reference to,
       but that was removed from the page.
       Elements removed from the page with `*ngFor` or `*ngIf` also become stale.*/
    browser.wait(EC.stalenessOf(dialogTitle), 3000,
      'wait for dialog to close');

    expect(dialogTitle.isPresent()).toBeFalsy();
  });

  it('should enable the follow button with more than two posts', () => {
    browser.waitForAngularEnabled(true);

    const feedButton = element(by.css('button.feed-button'));
    feedButton.click();

    const followButton = element(by.css('button.follow'));
    expect(followButton.isEnabled()).toBeFalsy();
    const moreThanOnePost = () => {
      return element.all(by.css('app-contact-feed mat-list-item')).count()
        .then((count) => { return count >= 2; });
    };
    browser.wait(moreThanOnePost, 20000, 'Waiting for two posts');

    expect(followButton.isEnabled()).toBeTruthy();
  });

  it('should enable the follow button (custom finder)', () => {
    const feedButton = element(by.css('button.feed-button'));
    feedButton.click();

    const followButton = element(by.css('button.follow'));
    expect(followButton.isEnabled()).toBeFalsy();

    function findAllPosts() {
      return document.querySelectorAll('app-contact-feed mat-list-item');
    }

    browser.wait(() => {
      return browser.driver.executeScript(findAllPosts)
        .then((posts: WebElement[]) => {
          return posts.length >= 2;
        })}, 20000, 'Waiting for two posts');

    expect(followButton.isEnabled()).toBeTruthy();
    });
});
