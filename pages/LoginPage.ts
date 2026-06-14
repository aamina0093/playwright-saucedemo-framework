import { Page } from '@playwright/test';

export class LoginPage {

  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async enterUsername(username: string) {
    await this.page.locator('[data-test="username"]').fill(username);
  }

  async enterPassword(password: string) {
    await this.page.locator('[data-test="password"]').fill(password);
  }

  async clickLoginButton() {
    await this.page.locator('[data-test="login-button"]').click();
  }

  async getErrorMessage() {
    return await this.page.locator('[data-test="error"]').innerText();
  }

}