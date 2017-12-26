const {Builder, By, Key, until} = require('..');
const {Options} = require('../chrome');

(async function() {
  let driver;
  try {
    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new Options().androidChrome())
        .build();
    await driver.get('http://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  } finally {
    await driver && driver.quit();
  }
})().then(_ => console.log('SUCCESS'), err => console.error('ERROR: ' + err));