import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Cart Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLoginButton();
  });

  test('should show added product in cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.addToCart('Sauce Labs Backpack');
    await productsPage.goToCart();

    const isVisible = await cartPage.isProductInCart('Sauce Labs Backpack');
    expect(isVisible).toBe(true);
  });

  test('should remove a product from cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.addToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    await cartPage.removeItem('Sauce Labs Backpack');

    const isVisible = await cartPage.isProductInCart('Sauce Labs Backpack');
    expect(isVisible).toBe(false);
  });

  test('should go back to products page on clicking continue shopping', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.goToCart();
    await cartPage.clickContinueShopping();

    await expect(page).toHaveURL('/inventory.html');
  });

});