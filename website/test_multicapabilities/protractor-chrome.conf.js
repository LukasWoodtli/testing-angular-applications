
exports.config = {
  multiCapabilities: [ {
    browserName: 'chrome',
  }, {
    browserName: 'chrome'
  }],
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  baseUrl: 'https://testing-angular-applications.github.io',
  specs: ['e2e/**/*.e2e-spec.ts'],
  onPrepare: () => {
    require('ts-node').register({
      project: 'e2e'
    });
  }
}
