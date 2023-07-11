import {
  ChromiumBrowser,
  Page,
  chromium,
  BrowserContext,
} from "@playwright/test";
import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  Status,
  AfterStep,
  BeforeStep,
} from "@cucumber/cucumber";
import { pageFixture } from "./pageFixture";

let browser: ChromiumBrowser;
let page: Page;
let context: BrowserContext;
BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});
Before(async function () {
  context = await browser.newContext();
  page = await context.newPage();
  pageFixture.page = page;
});
//Attach screenshots after step
AfterStep(async function ({ pickle, result }) {
  const img = await pageFixture.page.screenshot({
    path: `src/tests/report/screenshots/${pickle.name}.png`,
    type: "png",
    fullPage: true,
  });
  if (img) {
    await this.attach(img, "image/png");
  }
});

After(async function ({ pickle, result }) {
  //TO generate screenshot
  // console.log("result?.status  : ", result?.status);
  if (result?.status === Status.FAILED) {
    const img = await pageFixture.page.screenshot({
      path: `src/tests/report/screenshots/${pickle.name}.png`,
      type: "png",
      fullPage: true,
    });
    if (img) {
      await this.attach(img, "image/png");
    }
  }

  await pageFixture.page.close();
  await context.close();
});
AfterAll(async function () {
  await browser.close();
});
