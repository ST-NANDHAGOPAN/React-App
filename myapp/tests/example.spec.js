import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/React/);
});

test('get started link', async ({ page }) => {
  try {
    await page.goto('http://localhost:3000/');

    // Click the get started link.
    const getStartedLink = await page.waitForSelector('a', { text: 'Get started' });
    await getStartedLink.click();

    // Wait for the installation heading to become visible.
    const installationHeading = await page.waitForSelector('h1', { text: 'Installation', visible: true, timeout: 5000 });

    // Check if the element is visible using 'isVisible' property.
    const isVisible = await installationHeading.isVisible();
    await expect(isVisible).toBeTruthy(); // This expectation checks if isVisible is true.

  } catch (error) {
    console.error('Test error:', error);
    throw error; // Rethrow the error to mark the test as failed.
  }
});


