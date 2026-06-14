import { Page } from '@playwright/test';

export class CartPage {

  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isProductInCart(productName: string) {
    return await this.page.locator('.cart_item').filter({ hasText: productName }).isVisible();
  }

  async clickCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  async clickContinueShopping() {
    await this.page.locator('[data-test="continue-shopping"]').click();
  }

  async removeItem(productName: string) {
    await this.page.locator('.cart_item').filter({ hasText: productName }).locator('button').click();
  }

}