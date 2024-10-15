import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly productCategory: Locator;
  readonly products: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCategory = page.locator('a[href="/discover/products"]');
    this.products = page.locator('.p-tile-home');
  }

  async navigateToProductPage() {
    await this.productCategory.click();
    await this.page.waitForLoadState("networkidle");
  }


  async addToCart() {
    try {
      const addToCartButton = this.page.locator('button[id="add-to-cart"]');
      if (await addToCartButton.count() > 0) {
        await addToCartButton.click();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }
  
  async addItemsToCart() {
    try {
      const count = await this.products.count();
      let productWithoutDiscountFound = false;
  
      for (let i = 0; i < count; i++) {
        try {
          const product = this.products.nth(i);
          const discountCount = await product.locator('.discount').count();
  
          if (discountCount === 0) {
            productWithoutDiscountFound = true;
            await product.click();
            await this.addToCart();
            await this.page.goBack();
            await this.page.waitForLoadState('networkidle');
          }
        } catch (innerError) {
          console.error(`Error processing product at index ${i}:`, innerError);
        }
      }
  
      if (!productWithoutDiscountFound) {
        console.log('No products without discounts found.');
        return;
      }
    } catch (error) {
      console.error('Error adding items to cart:', error);
    }
  }

  async navigateToSupportPage() {
    try {
      await this.page.hover('div.parent_nav_link:has-text("Support")');

      const [newPage] = await Promise.all([
        this.page.waitForEvent("popup"),
        this.page.click('a[href="https://auth.tetonelectronics.com/"]'),
      ]);

      console.log("Navigated to the new page:", newPage.url());

      const titleContext = await newPage
        .getByRole("heading", { name: "Product Verification" })
        .textContent();
      await expect(titleContext).toContain("Product Verification");

      await newPage.fill('input[name="serial_number"]', "rifat");
      await newPage.click('input[type="submit"][value="Verify"]');

      const errorMsg = await newPage
        .locator('div[class="overlay-form"]')
        .locator('div[id="validationMsg"]')
        .locator("p")
        .textContent();
      await expect(errorMsg).toContain(
        "We are sorry to inform you that the product you have purchased is not official product."
      );

      // await this.page.pause();
    } catch (error) {
      console.error("Error navigating to support page:", error);
    }
  }


  async findAndProduct(productName: string) {
    try {
      const productContainers = await this.page
        .locator('div[class="tile-container"]')
        .locator('div[class="p-tile p-tile-home"]')
        .locator('div[class="item-title item__details"]');
  
      const productCount = await productContainers.count();
  
      for (let i = 0; i < productCount; i++) {
        try {
          const productElement = productContainers.nth(i).locator("h5");
          const productTitle = await productElement.textContent();
  
          if (productTitle) {
            const trimmedTitle = productTitle.trim();
            console.log(trimmedTitle);
            if (trimmedTitle === productName) {
              console.log("hi");
              await productContainers.nth(i).click();
              await this.page.getByLabel("Add to cart").click();
              await this.page.getByRole("link", { name: "Cart" }).click();
              break;
            }
          }
        } catch (innerError) {
          console.error(`Error processing product at index ${i}:`, innerError);
        }
      }
    } catch (error) {
      console.error('Error finding products:', error);
    }
  }

  async shoppingCart() {
    try {
      const item = await this.page
        .locator('div[class="grow"]').locator('h6')
        .locator("span")
        .first()
        .textContent();
  
      if (item) {
        console.log(item);
  
        const [pricePart, discountPart] = item.split("(");
        const price = parseFloat(pricePart.trim().replace("৳", "").replace(/,/g, ""));
        const discount = parseFloat(discountPart.trim().replace("% offer)", ""));
  
        console.log(`Price: ${price}`);
        console.log(`Discount: ${discount}`);
  
        const afterDiscountPriceText = await this.page
          .locator('h5[class="price inl-b-sm"]')
          .locator("span")
          .first()
          .textContent();
  
        if (afterDiscountPriceText) {
          const afterDiscountPrice = parseFloat(
            afterDiscountPriceText.trim().replace("৳", "").replace(/,/g, "")
          );
          console.log(`After Discount Price: ${afterDiscountPrice}`);
  
          const expectedAfterDiscountPrice = price * (1 - discount / 100);
          console.log(
            `Expected After Discount Price: ${expectedAfterDiscountPrice}`
          );
  
          await expect(afterDiscountPrice).toBeCloseTo(expectedAfterDiscountPrice, 2);
        } else {
          console.log("After Discount Price is null");
        }
      } else {
        console.log("Item is null");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
}
