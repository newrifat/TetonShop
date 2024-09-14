import { test, expect, Page } from "@playwright/test";
import { WPTest } from "../fixtures/page.fixture";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.BASE_URL;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const appName = process.env.APP_NAME;

WPTest.describe("Assesment Test", () => {
  WPTest.beforeEach(async ({ page, toLoginPage }) => {
    await page.goto(baseUrl || "");
    await toLoginPage.login(username || "", password || "");
  });

  WPTest("Check Plugin Status", async ({ toDashboardPage }) => {
    await toDashboardPage.navigateToPlugins();
    await toDashboardPage.addNewPlugin();
    await toDashboardPage.searchPlugin(appName || "");
    await toDashboardPage.activatePlugin();
  });

  WPTest("Check Dark Mode", async ({ toDashboardPage }) => {
    await toDashboardPage.navigateToWPDarkMode();
    await toDashboardPage.enableDarkMode();
    
  });

  WPTest("Change Plugin Settings", async ({ toDashboardPage }) => {
    await toDashboardPage.navigateToWPDarkMode();
    await toDashboardPage.goToCustomization();
    await toDashboardPage.switchStyle();
    await toDashboardPage.selectCustomAndFill();
    await toDashboardPage.selectLeft();
    await toDashboardPage.enableKeyboardShortcut();
    await toDashboardPage.enablePageTransitionAnimation();
  });
});
