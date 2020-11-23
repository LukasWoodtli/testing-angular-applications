import {browser, by, element} from "protractor";
import * as fs from "fs";
import {compareScreenshot} from "./screenshot_helper";
import * as path from "path";

const GOLDEN_IMG = path.join(__dirname, 'contact_list_golden.png');

describe('the contact list', () => {
  beforeAll(() => {
    browser.get('/#/');
    browser.driver.manage().window().setSize(1024, 600);
  });

  // needs to be synchronous (add `done` to `it`) and call it when finished
  it('should be able to login', (done) => {
    const list = element(by.css('app-contact-list'));
    browser.waitForAngular();

    /* Taking screenshots
    browser.takeScreenshot().then((data) => {
      fs.writeFileSync('screenshot.png', data, 'base64')
      done();
    }) */

    // Compare screenshots
    expect(list.getText()).toContain('Jeff Pipe');
    browser.takeScreenshot()
      .then((data) => {
        return compareScreenshot(data, GOLDEN_IMG);
      })
      .then((result) => {
        expect(result).toBeTruthy();
        done();
      });
  });

  /* This test fails and makes a screenshot
  it('fails: check if plugin for taking screenshot on failure works', () => {
    const list = element(by.css('app-contact-list'));
    browser.waitForAngular();
    expect(true).isFalsey();
  }); */
});
