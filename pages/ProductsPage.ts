import { Page } from '@playwright/test';

export class ProductsPage {

  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getPageTitle() {
    return await this.page.locator('.title').innerText();
  }

  async addToCart(productName: string) {
    await this.page.locator('.inventory_item').filter({ hasText: productName }).locator('button').click();
  }

  async getCartCount() {
    return await this.page.locator('[data-test="shopping-cart-badge"]').innerText();
  }

  async goToCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  async sortProducts(option: string) {
    await this.page.locator('[data-test="product-sort-container"]').selectOption(option);
  }

}