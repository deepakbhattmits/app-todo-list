// import { Given, When, Then } from "@cucumber/cucumber";

import { setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
const { Given, When, Then } = require("@cucumber/cucumber");
const { pageFixture } = require("../../hooks/pageFixture");
setDefaultTimeout(60 * 1000 * 2);
Given("User navigates to the application", async function () {
  await pageFixture.page.goto("http://localhost:3000/");
  await pageFixture.page.waitForLoadState();
  // await pageFixture.page.waitForTimeout(1000);
  await expect(pageFixture.page.locator('[data-testid="header"]')).toHaveCount(
    1
  );
});

When("User types in the {string}", async function (input: string) {
  await pageFixture.page.locator('[data-testid="todo-input"]').fill(input);
  await pageFixture.page.locator('[data-testid="todo-submit"]').click();
});

Then("I should see todo in list", async function () {
  // await pageFixture.page.waitForLoadState();
  // await pageFixture.page.waitForTimeout(1000);
  expect(pageFixture.page.locator('[data-testid="todo-item"]')).toBeVisible();
});
