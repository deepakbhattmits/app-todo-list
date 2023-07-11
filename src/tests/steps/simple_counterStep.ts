import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

const { pageFixture } = require("../../hooks/pageFixture");

Given("User visits homepage", async function () {
  const page = pageFixture.page!;
  await page.goto("localhost:3000");
});

When("User clicks the + button", async function () {
  const page = pageFixture.page!;
  const plusButton = page.locator('[data-testid="increase"]');
  await expect(plusButton).toBeVisible();
  await plusButton.click();
});

Then("User sees the counter get increased", async function () {
  const page = pageFixture.page!;
  const counterText = page.locator('[data-testid="counter-text"]');
  await expect(counterText).toHaveText("Count: 1");
});

When("User clicks the - button", async function () {
  const page = pageFixture.page!;
  const plusButton = page.locator('[data-testid="decrease"]');
  await expect(plusButton).toBeVisible();
  await plusButton.click();
});
Then("User sees the counter get decreased", async function () {
  const page = pageFixture.page!;
  const counterText = page.locator('[data-testid="counter-text"]');
  await expect(counterText).toHaveText("Count: 0");
});
