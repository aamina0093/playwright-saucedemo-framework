import { Page } from '@playwright/test';

export class CheckoutPage {

  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async enterFirstName(firstName: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
  }

  async enterLastName(lastName: string) {
    await this.page.locator('[data-test="lastName"]').fill(lastName);
  }

  async enterPostalCode(postalCode: string) {
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  }

  async clickContinue() {
    await this.page.locator('[data-test="continue"]').click();
  }

  async clickFinish() {
    await this.page.locator('[data-test="finish"]').click();
  }

  async getConfirmationMessage() {
    return await this.page.locator('.complete-header').innerText();
  }

  async getErrorMessage() {
    return await this.page.locator('[data-test="error"]').innerText();
  }

}