export const config: WebdriverIO.Config = {
    runner: 'local',
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',
    protocol: 'http',
    specs: ['./test/specs/**/*.ts'],
    exclude: [],
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'emulator-5554',
        'appium:udid': 'emulator-5554',
        'appium:appPackage': 'br.com.lojaebac',
        'appium:appActivity': '.MainActivity',
        'appium:noReset': true,
        'appium:newCommandTimeout': 120
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 15000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 1,
    services: [],
    framework: 'mocha',
reporters: [
    'spec',
    ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false
    }]
],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};
