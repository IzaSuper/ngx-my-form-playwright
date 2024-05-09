import { test, expect } from '@playwright/test';
test.describe("home page is visible", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/')
    })
    test("page is visible", async ({page}) => {
        const isVisible = await page.isVisible(('body'))
        expect(isVisible).toBe(true)
    })
    test("link to array is active", async ({page}) => {
        await expect (page.locator('#index')).toHaveText('Array')
        await page.click('#index')
        await expect(page).toHaveURL('/index')
        await expect (page.locator('#header')).toContainText('Create my SUPER array from numbers from -10 to 10')
    })
    test("link to reservation is active", async ({page}) => {
        await expect (page.locator('#reservation')).toHaveText('Reservation')
        await page.click('#reservation')
        await expect(page).toHaveURL('/reservation')
        await expect (page.locator('#title')).toContainText('Check and make your reservation')
    })
})
