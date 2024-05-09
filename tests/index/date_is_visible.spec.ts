import { test, expect } from '@playwright/test';
test.describe("date is visible", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/index')
    })
    test("date is correct", async ({page}) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        } as Intl.DateTimeFormatOptions
        const dateNow = new Date().toLocaleDateString('en-US', options)
        const footer = page.locator('#footer')
        await expect(footer).toContainText(dateNow)
    })
    test("time is changing correctly", async ({page}) => {
        const date_1 = await page.locator('#footer').innerHTML()
        console.log(date_1, 'one')
        await page.waitForTimeout(1000)
        const date_2 = await page.locator('#footer').innerHTML()
        console.log(date_2, 'two')
        expect(date_2).not.toEqual(date_1)
    })
})