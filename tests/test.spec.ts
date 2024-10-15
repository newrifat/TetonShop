import { test, expect, Page } from "@playwright/test";
import { WPTest } from "../fixtures/page.fixture";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.BASE_URL;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const productName = process.env.PROD_NAME;

WPTest.describe("Assessment Test", () => {
  WPTest.beforeEach(async ({ page, toLoginPage }) => {
    await page.goto(baseUrl || "");
    // await page.goto('https://bdshop.tetonelectronics.com/login');
    await toLoginPage.login(username || "", password || "");
  });

  WPTest('Product Discount Checking', async ({ page, toDashboardPage }) => {
    await toDashboardPage.navigateToProductPage();
    await toDashboardPage.addItemsToCart();
  });


  WPTest('Product Selection', async ({ page, toDashboardPage }) => {
    await toDashboardPage.navigateToProductPage();
    await toDashboardPage.findAndProduct(productName || "");
    await toDashboardPage.shoppingCart();
   });


  WPTest('Product Authentication', async ({ page, toDashboardPage }) => {
    await toDashboardPage.navigateToSupportPage();
  });
});
