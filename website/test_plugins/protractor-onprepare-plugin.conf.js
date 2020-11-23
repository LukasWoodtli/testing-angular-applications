
exports.config = {
  directConnect: true,
  capabilities: {
    browserName: 'chrome'
  },
  baseUrl: 'https://testing-angular-applications.github.io',
  specs: ['e2e/**/*.e2e-spec.ts'],

  plugins: [{
    inline: {
      onPrepare: () => {
        let jasmineReporters = require('jasmine-reporters');
        let junitReporter = new jasmineReporters.JUnitXmlReporter({
          savePath: 'output/',
          consolidate: false
        });
        jasmine.getEnv().addReporter(junitReporter);
        require('ts-node').register({
          project: 'e2e'
        });
      }
    }
  }]
};
