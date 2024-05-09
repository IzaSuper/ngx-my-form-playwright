import { test, expect } from '@playwright/test';
test.describe("page is visible", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/reservation')
    })
    test("page is visible", async ({page}) => {
        const title = page.locator('#title')
        await expect(title).toContainText('Check and make your reservation')
    })
    test("2 buttons and 2 anchors are visible", async ({page}) => {
        const buttons = page.locator('button')
        await expect(buttons).toHaveCount(2)
        await expect(buttons.nth(0)).toContainText('Check total cost')
        await expect(buttons.nth(1)).toContainText('Clear parameters')
        const anchors = page.locator('a')
        await expect(anchors).toHaveCount(2)
        await expect(anchors.nth(0)).toContainText('Back to main')
        await expect(anchors.nth(1)).toContainText('Check selected hotel')
    })
})
