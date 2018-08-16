// @ts-check
var puppeteer = require("puppeteer");

async function runLoadTest(contexts = 3) {
  let browser = await puppeteer.launch();

  let pageArr = await Promise.all(
    Array.from(Array(contexts)).map(async (item, index) => {
      let context = await browser.createIncognitoBrowserContext();
      return context.newPage();
    })
  );

  await Promise.all(
    pageArr.map(page => {
      return page.goto("https://ll357.herokuapp.com", { timeout: 60000 });
    })
  );

  await Promise.all(
    pageArr.map(async (page, index) => {
      let inputHandle = await page.$("#playername");

      await page.evaluateHandle(
        (input, i) => {
          input.value = `User${i}`;
        },
        inputHandle,
        index
      );

      await page.click("#registerbutton");
      return page.waitForNavigation({ waitUntil: "load" });
    })
  );

  await Promise.all(
    pageArr.map(async (page, index) => {
      await page.click("#playbutton");
      return page.waitForNavigation({ waitUntil: "load" });
    })
  );

  await new Promise(resolve => setTimeout(resolve, 10000));

  browser.close();
}

runLoadTest(100).then(() => {
  process.exit(0);
});
