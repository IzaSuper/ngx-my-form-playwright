import { test, expect } from '@playwright/test';
test.describe("back to main button works correctly", () => {
    test("test", async ({page}) => {
        await page.goto('/reservation')
        await page.click('#back')
        await expect(page).toHaveURL('/')
        await expect (page.locator('.header')).toContainText('Hello, this is my simple Angular application')
    })
})
