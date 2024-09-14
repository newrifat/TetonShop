import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly toastMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toastMessage = page
      .locator('div[class*="main-content-toast"]')
      .locator("span");
  }

  async navigateToPlugins() {
    await this.page.getByRole("link", { name: "Plugins", exact: true }).click();
  }

  async addNewPlugin() {
    await this.page
      .getByLabel("Main menu", { exact: true })
      .getByRole("link", { name: "Add New Plugin" })
      .click();
  }

  async searchPlugin(pluginName: string) {
    await this.page.locator('input[id="search-plugins"]').fill(pluginName);
  }

  async activatePlugin() {
    const cartInfo = this.page.locator('div[class="plugin-card-top"]').filter({
      hasText:
        "WP Dark Mode – WordPress Dark Mode Plugin for Improved Accessibility, Dark Theme, Night Mode, and Social Sharing",
    });
    const activeButton = await cartInfo.getByRole("button", { name: "Active" });

    if (await activeButton.isDisabled()) {
      return;
    } else {
      console.log("The button is not disabled.");
      await this.installAndActivatePlugin(cartInfo);
    }
  }

  async enableDarkMode() {
    await this.page
      .getByRole("link", { name: "Admin Panel Dark Mode" })
      .click();
    await this.page
      .locator("label")
      .filter({ hasText: "Enable Admin Dashboard Dark" })
      .locator("div")
      .first()
      .click();
    await this.page.getByRole("button", { name: "Save Changes" }).click();
    await expect(this.toastMessage).toContainText("Saved Successfully");
    await this.toastMessage.waitFor({ state: 'hidden' });
    await this.page.locator("span").filter({ hasText: "Dark" }).click();
    await expect(this.page.locator('div[id="wpbody"]')).toHaveCSS(
      "background-color",
      "rgb(39, 40, 39)"
    );
  }

  async installAndActivatePlugin(cartInfo) {
    await cartInfo.getByRole("button", { name: "Install Now" }).click();
    await this.page.waitForTimeout(30000);
    await cartInfo.getByRole("button", { name: "Activate" }).click();
  }

  async navigateToWPDarkMode() {
    await this.page
      .getByRole("link", { name: "WP Dark Mode", exact: true })
      .click();
  }

  async goToCustomization() {
    await this.page.getByRole("heading", { name: "Customization" }).click();
  }

  async switchStyle() {
    await this.page.getByRole("link", { name: "Switch Settings" }).click();
    await this.page
      .locator("div")
      .filter({ hasText: /^LightDark$/ })
      .first()
      .click();
    await this.page.getByRole("button", { name: "Save Changes" }).click();
    await expect(this.toastMessage).toContainText("Saved Successfully");
    await this.toastMessage.waitFor({ state: 'hidden' });
  }

  async selectCustomAndFill() {
    await this.page.getByRole("link", { name: "Switch Settings" }).click();
    await this.page
      .locator("div")
      .filter({ hasText: /^Custom$/ })
      .locator("span")
      .click();
    await this.page.getByRole("spinbutton").fill("220");
  }

  async selectLeft() {
    await this.page.getByRole("link", { name: "Switch Settings" }).click();
    await this.page.getByText("Left").click();
    await this.page.getByRole("button", { name: "Save Changes" }).click();
    await expect(this.toastMessage).toContainText("Saved Successfully");
    await this.toastMessage.waitFor({ state: 'hidden' });
  }

  async enableKeyboardShortcut() {
    await this.page.getByRole("link", { name: "Switch Settings" }).click();
    await this.page
      .getByRole("link", { name: "Accessibility", exact: true })
      .click();
    await this.page
      .locator("label")
      .filter({ hasText: "Keyboard Shortcut" })
      .locator("div")
      .first()
      .click();
    await this.page.getByRole("button", { name: "Save Changes" }).click();
    await expect(this.toastMessage).toContainText("Saved Successfully");
    await this.toastMessage.waitFor({ state: 'hidden' });
  }

  async enablePageTransitionAnimation() {
    await this.page.getByRole("link", { name: "Site Animation" }).click();
    await this.page
      .locator("label")
      .filter({ hasText: "Enable Page Transition Animation" })
      .locator("div")
      .first()
      .click();
    await this.page.locator("span").filter({ hasText: "Roll" }).click();
    await this.page.getByRole("button", { name: "Save Changes" }).click();
    await expect(this.toastMessage).toContainText("Saved Successfully");
    await this.toastMessage.waitFor({ state: 'hidden' });
  }
}
