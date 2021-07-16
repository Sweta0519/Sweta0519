const {Builder, By, Key, until} = require('selenium-webdriver')
const utils = require('./utils')
const assert = require('assert');

const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;
//const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.us-west-1.saucelabs.com:443/wd/hub`;
// NOTE: Use the URL below if using our EU datacenter (e.g. logged in to app.eu-central-1.saucelabs.com)
 const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com:443/wd/hub`;


/**
* Run this test before working on the problem.
* When you view the results on your dashboard, you'll see that the test "Failed".
* Your job is to figure out why the test failed and make the changes necessary to make the test pass.
*
* Bonus: Once you get the test working, update the code so that when the test runs, it 
* can reach the Sauce Labs homepage 
* hover over 'Resources' and then clicks the 'Documentation' link
*/

describe('Broken Sauce', function () {
  this.timeout(40000);
    it('should go to Google and click Sauce', async function () {
        let driver = await new Builder().withCapabilities(utils.brokenCapabilities)
                    .usingServer(ONDEMAND_URL).build();

        await driver.get("https://www.google.com");
        // If you see a German or English GDPR modal on google.com you 
        // will have to code around that or use the us-west-1 datacenter.
        // You can investigate the modal elements using a Live Test(https://app.saucelabs.com/live/web-testing)


        driver.manage().window().maximize(); // Maximized the window and found the element from GDPR modal window in order to proceed

        driver.wait(until.elementLocated(By.id("L2AGLb")),8000).click().then( function() {
             done();
        });

        let search = await driver.findElement(By.name("q"),8000); // Note: sometime it is finding the element and sometime its not able to find and shows "ElementNotInteractableError: element not interactable"

        driver.manage().window().maximize();
        await search.sendKeys("Sauce Labs");

        let button = await driver.findElement(By.name("btnK"),8000)
        await button.click()

       // let page = await driver.findElement(By.partialLinkText("sauce"));

        // Bonus task
          let page = await driver.findElement(By.xpath("//*[text()='Sauce Labs: Cross Browser Testing, Selenium Testing, Mobile ...']", 8000));


          await  page.click();

          const actions = driver.actions(); // initialized actions for performing Hover over
          await assert.strictEqual("Cross Browser Testing, Selenium Testing, Mobile Testing | Sauce Labs", await driver.getTitle(),3000); // to check if the website opened or not

          const element = driver.wait(until.elementLocated({css:'#headerMainNav > div > nav > ul > li.nav-menu-list-container > ul:nth-child(2) > li:nth-child(4) > div.nav-menu > div > a'}),8000); // until.elementLocated used to check element visibility
          await actions.move({origin: element}).perform(); // move function is called for moving the cursor to the found element

          const document = driver.wait(until.elementLocated({css:'#headerMainNav > div > nav > ul > li.nav-menu-list-container > ul:nth-child(2) > li:nth-child(4) > div.nav-menu-link-group-row-list-wrapper > div > div > div > ul > li:nth-child(2) > div > ul > li > div > ul > li:nth-child(1) > div > ul > li > ul > li:nth-child(1) > a'}),8000);
          await actions.move({origin: document}).perform();

          document.click(); // To click Documentation link and open saucelab wiki page

          await driver.quit();
    });
});
