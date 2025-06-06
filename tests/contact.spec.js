import { test, expect } from '@playwright/test';

test.describe('Contact form', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to contact page before each test
    await page.goto('http://localhost:5500/public/contact.html');
  });

  test('should submit form successfully', async ({ page }) => {
    // Fill in the form
    await page.fill('#firstname', 'John');
    await page.fill('#lastname', 'Doe');
    await page.fill('#email', 'john.doe@example.com');
    await page.fill('#message', 'This is a test message');

    // Submit the form
    await page.click('button[type="submit"]');

    // Verify confirmation message appears
    const confirmationMessage = await page.locator('#confirmation');
    await expect(confirmationMessage).toBeVisible();
    await expect(confirmationMessage).toHaveText('Merci pour votre message');

    // Take screenshot after successful submission
    await page.screenshot({ path: './test-results/formulaire-envoye.png' });
  });

  test.describe('Form validation', () => {
    test('should not submit if firstname is empty', async ({ page }) => {
      // Fill form with missing firstname
      await page.fill('#lastname', 'Doe');
      await page.fill('#email', 'john.doe@example.com');
      await page.fill('#message', 'Test message');

      // Submit form
      await page.click('button[type="submit"]');

      // Verify confirmation message does not appear
      const confirmationMessage = await page.locator('#confirmation');
      await expect(confirmationMessage).not.toBeVisible();
    });

    test('should not submit if email is invalid', async ({ page }) => {
      // Fill form with invalid email
      await page.fill('#firstname', 'John');
      await page.fill('#lastname', 'Doe');
      await page.fill('#email', 'invalid-email');
      await page.fill('#message', 'Test message');

      // Submit form
      await page.click('button[type="submit"]');

      // Verify confirmation message does not appear
      const confirmationMessage = await page.locator('#confirmation');
      await expect(confirmationMessage).not.toBeVisible();
    });

    test('should not submit if message is empty', async ({ page }) => {
      // Fill form with missing message
      await page.fill('#firstname', 'John');
      await page.fill('#lastname', 'Doe');
      await page.fill('#email', 'john.doe@example.com');

      // Submit form
      await page.click('button[type="submit"]');

      // Verify confirmation message does not appear
      const confirmationMessage = await page.locator('#confirmation');
      await expect(confirmationMessage).not.toBeVisible();
    });
  });
});