import { expect, Locator, Page } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export class LoginPage {
  readonly page: Page;
  readonly userName: Locator;
  readonly password: Locator;
  readonly logIn: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.locator('input[placeholder="Your email"]');
    this.password = page.locator('input[placeholder="Your password"]');
    this.logIn = page.locator('button[aria-label="Submit"]');
    this.logo = page.locator('a.logo img[alt="Site Logo"]');
  }

  async login(username: string, password: string) {
    await this.page.waitForLoadState();
    await this.userName.fill(username);
    await this.page.waitForTimeout(1000);
    await this.password.fill(password);
    await this.logIn.click();
    await expect(this.logo).toBeVisible();
  } 
}