import { test, expect } from "@playwright/test";

test.describe("QueryBuilder Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("should render the QueryBuilder component", async ({ page }) => {
    // Check if the QueryBuilder title is visible
    const title = await page.locator("text=Query Builder");
    await expect(title).toBeVisible();
  });

  test("should allow adding a rule and submitting the query", async ({
    page,
  }) => {
    // Interact with the GroupedRules component (e.g., add a rule)
    const fieldSelect = page.locator(
      'button[role="combobox"] span[data-slot="select-value"]',
      {
        hasText: "Name",
      }
    );
    await expect(fieldSelect).toBeVisible();

    const operationSelect = page.locator(
      'button[role="combobox"] span[data-slot="select-value"]',
      {
        hasText: "EQUAL",
      }
    );
    await expect(operationSelect).toBeVisible();

    // Target the value input field
    const valueInput = page.locator('input[name="value"]');
    await valueInput.fill("Atul");

    const submitButton = page.locator('button:has-text("Submit")');
    await submitButton.click();

    await page.waitForSelector("text=Query submitted successfully!");
    const alertMessage = page.locator("text=Query submitted successfully!");
    await expect(alertMessage).toBeVisible();
  });

  test("should display the query preview", async ({ page }) => {
    // Check if the query preview is displayed
    const queryPreview = page.locator("text=Query Preview");
    await expect(queryPreview).toBeVisible();
  });
});
