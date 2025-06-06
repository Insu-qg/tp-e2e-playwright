import { test, expect } from '@playwright/test';

test.describe('Product order form', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to order page before each test
    await page.goto('http://localhost:5500/public/order.html');
  });

  test.describe('Successful orders', () => {
    test('should confirm order with express delivery', async ({ page }) => {
      // Select product
      await page.selectOption('#product', 'T-shirt');
      // Set quantity
      await page.fill('#quantity', '3');
      // Select express delivery
      await page.check('input[value="express"]');
      // Submit order
      await page.click('button[type="submit"]');

      // Check confirmation message
      const summary = await page.locator('#summary');
      await expect(summary).toBeVisible();
      await expect(summary).toHaveText('Commande confirmée : 3 x T-shirt, livraison express');
    });

    test('should confirm order with standard delivery', async ({ page }) => {
      await page.selectOption('#product', 'Mug');
      await page.fill('#quantity', '1');
      // Standard delivery is checked by default
      await page.click('button[type="submit"]');

      const summary = await page.locator('#summary');
      await expect(summary).toBeVisible();
      await expect(summary).toHaveText('Commande confirmée : 1 x Mug, livraison standard');
    });
  });

  test.describe('Validation errors', () => {
    test('should show alert when no product is selected', async ({ page }) => {
      await page.fill('#quantity', '1');
      
      // Handle dialog
      page.on('dialog', async dialog => {
        expect(dialog.message()).toBe('Veuillez remplir tous les champs correctement.');
        await dialog.accept();
      });

      await page.click('button[type="submit"]');
      
      // Verify summary is not visible
      const summary = await page.locator('#summary');
      await expect(summary).not.toBeVisible();
    });

    test('should show alert when quantity is zero', async ({ page }) => {
      await page.selectOption('#product', 'T-shirt');
      await page.fill('#quantity', '0');

      page.on('dialog', async dialog => {
        expect(dialog.message()).toBe('Veuillez remplir tous les champs correctement.');
        await dialog.accept();
      });

      await page.click('button[type="submit"]');
      await expect(page.locator('#summary')).not.toBeVisible();
    });

    test('should not submit with empty fields', async ({ page }) => {
      // Leave all fields empty/default
      await page.click('button[type="submit"]');
      
      // Verify summary is not visible
      const summary = await page.locator('#summary');
      await expect(summary).not.toBeVisible();
    });
  });
});