const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let chromeOptions = new chrome.Options();
chromeOptions.addArguments('disable-infobars');
chromeOptions.setUserPreferences({ credential_enable_service: false });

function Page() {
  this.driver = new Builder()
    .setChromeOptions(chromeOptions)
    .forBrowser('chrome')
    .build();

  // visit a webpage
  this.visit = async function(url) {
    return await this.driver.get(url);
  };

  // quit current session
  this.quit = async function() {
    return await this.driver.quit();
  };

  // wait and find a specific element with it's id
  this.findById = async function(id) {
    await this.driver.wait(until.elementLocated(By.id(id)), 1500, 'Looking for element');
    return await this.driver.findElement(By.id(id));
  };

  this.findByName = async function(name) {
    await this.driver.wait(until.elementLocated(By.name(name)), 1500, 'Looking for element');
    return await this.driver.findElement(By.name(name));
  };
  
  // fill out web elements
  this.write = async function(el, text) {
    return await el.sendKeys(text);
  };
}

module.exports = Page;
