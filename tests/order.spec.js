import { test, expect } from '@playwright/test';

// Test data for different products and deliveries
const orderTestCases = [
  {
    product: 'T-shirt',
    quantity: 3,
    delivery: 'express',
    expected: 'Commande confirmée : 3 x T-shirt, livraison express'
  },
  {
    product: 'Mug',
    quantity: 1,
    delivery: 'standard',
    expected: 'Commande confirmée : 1 x Mug, livraison standard'
  }
];

test.describe('Product order form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5500/public/order.html');
  });

  // Using test.describe.parallel() to run tests in parallel
  test.describe.parallel('Successful orders', () => {
    for (const testCase of orderTestCases) {
      test(`should confirm order: ${testCase.quantity}x ${testCase.product} with ${testCase.delivery} delivery`, async ({ page }) => {
        // Select product
        await page.selectOption('#product', testCase.product);
        // Set quantity
        await page.fill('#quantity', testCase.quantity.toString());
        // Select delivery method
        if (testCase.delivery === 'express') {
          await page.check('input[value="express"]');
        }
        
        // Submit order
        await page.click('button[type="submit"]');

        // Check confirmation message
        const summary = await page.locator('#summary');
        await expect(summary).toBeVisible();
        await expect(summary).toHaveText(testCase.expected);

        // Take screenshot with dynamic name
        await page.screenshot({ 
          path: `./test-results/confirmation-${testCase.product}-${testCase.delivery}.png` 
        });
      });
    }
  });

  test.describe.parallel('Validation errors', () => {
    const errorCases = [
      { 
        scenario: 'empty product', 
        product: '', 
        quantity: '1' 
      },
      { 
        scenario: 'zero quantity', 
        product: 'T-shirt', 
        quantity: '0' 
      },
      { 
        scenario: 'empty fields', 
        product: '', 
        quantity: '' 
      }
    ];

    for (const errorCase of errorCases) {
      test(`should handle validation for ${errorCase.scenario}`, async ({ page }) => {
        // Fill form based on error case
        if (errorCase.product) {
          await page.selectOption('#product', errorCase.product);
        }
        if (errorCase.quantity) {
          await page.fill('#quantity', errorCase.quantity);
        }

        // Handle alert dialog
        if (errorCase.product === '' || errorCase.quantity === '0') {
          page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Veuillez remplir tous les champs correctement.');
            await dialog.accept();
          });
        }

        // Submit form
        await page.click('button[type="submit"]');

        // Verify summary is not visible
        const summary = await page.locator('#summary');
        await expect(summary).not.toBeVisible();

        // Take screenshot of error state
        await page.screenshot({ 
          path: `./test-results/error-${errorCase.scenario}.png` 
        });
      });
    }
  });
});