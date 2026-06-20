import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Products Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLoginButton();
  });

  test('should show products page title', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    const title = await productsPage.getPageTitle();
    expect(title).toBe('Products');
  });

  test('should add a product to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addToCart('Sauce Labs Backpack');

    const cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe('1');
  });

  test('should add multiple products to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addToCart('Sauce Labs Backpack');
    await productsPage.addToCart('Sauce Labs Bike Light');

    const cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe('2');
  });

  test('should sort products from low price to high price', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.sortProducts('lohi');

    const firstProduct = await page.locator('.inventory_item_price').first().innerText();
    expect(firstProduct).toBe('$7.99');
  });

});