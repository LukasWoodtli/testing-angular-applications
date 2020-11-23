import * as fs from 'fs';
import * as looksSame from 'looks-same';
import * as os from 'os';
import * as path from 'path';

function writeScreenshot(data) {
  return new Promise<string>(function (resolve, reject) {
    const folder = fs.mkdtempSync(`${os.tmpdir()}${path.sep}`);
    let screenshotFile = path.join(folder, 'new.png');
    fs.writeFile(screenshotFile, data, 'base64', function (err) {
      if (err) {
        reject(err);
      }
      resolve(screenshotFile);
    });
  });
}

export function compareScreenshot(data, golden) {
  return new Promise((resolve, reject) => {
    return writeScreenshot(data).then((screenshotPath) => {
      if (process.env['UPDATE_SCREENSHOTS']) {
        fs.writeFileSync(golden, fs.readFileSync(screenshotPath));
        resolve(true);
      } else {
        looksSame(screenshotPath, golden, {strict: false, tolerance: 2.5}, (error, equal) => {
          if (!equal) {
            looksSame.createDiff({
              reference: golden,
              current: screenshotPath,
              diff: 'diff.png',
              highlightColor: '#ff00ff'
            }, (error) => {
              resolve(equal);
            });
          } else {
            resolve(equal);
          }
        })
      }
    });
  });
}
