import { test, expect } from '@playwright/test';
test.describe("back to main button works correctly", () => {
    test("button", async ({page}) => {
        await page.goto('/index')
        await page.click('#backMain')
        await expect(page).toHaveURL('/')
        await expect (page.locator('.header')).toContainText('Hello, this is my simple Angular application')
    })
})
