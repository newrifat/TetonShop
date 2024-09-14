import { expect, Locator, Page } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const dashboardUrl = process.env.DASHBOARD_URL;

export class LoginPage {
  readonly page: Page;
  readonly userName: Locator;
  readonly password: Locator;
  readonly logIn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator('input[id="user_login"]');
    this.password = page.locator('input[id="user_pass"]');
    this.logIn = page.locator('input[id="wp-submit"]');
  }

  async login(username: string, password: string) {
    await this.page.waitForLoadState();
    await this.userName.fill(username);
    await this.page.waitForTimeout(1000);
    await this.password.fill(password);
    await this.logIn.click();
    await expect(this.page).toHaveURL(dashboardUrl || "");
  }
}
