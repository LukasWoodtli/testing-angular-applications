import {browser} from "protractor";
import * as fs from "fs";

export function postTest(passed: boolean, testInfo: any) {
  if(!passed) {
    const fileName = `${testInfo.name.replace(/ /g, '_')}_failure.png`;
    return browser.takeScreenshot().then((data) => {
      fs.writeFileSync(fileName, data, 'base64');
    })
  }
}
