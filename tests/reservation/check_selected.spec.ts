import {test, expect} from '@playwright/test';
let check: any
test.describe("check selected hotel", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/reservation')
        check = page.locator('#check')
    })
    test("check button is disabled by default", async () => {
        await expect(check).toHaveClass('btn btn-success btn-lg disabled')
    })
    test("link to Jumeirah works correctly", async ({page}) => {
        await expect(check).toHaveAttribute('href', '')
        await page.locator('#hotels').selectOption('Jumeirah')
        await expect(check).toHaveAttribute('href',
            '//www.booking.com/hotel/ae/sky-villa-penthouse-five-jvc.en-gb.html')
        await expect(check).toHaveClass('btn btn-success btn-lg')
    })
    test("link to TRYP works correctly", async ({page}) => {
        await expect(check).toHaveAttribute('href', '')
        await page.locator('#hotels').selectOption('TRYP')
        await expect(check).toHaveAttribute('href',
            '//www.booking.com/hotel/ae/tryp-by-wyndham-dubai.en-gb.html')
        await expect(check).toHaveClass('btn btn-success btn-lg')
    })
    test("check button is disabled and href has no value after reset data", async ({page}) => {
        await page.locator('#hotels').selectOption('TRYP')
        await expect(check).toHaveClass('btn btn-success btn-lg')
        await page.click('#clear')
        await expect(check).toHaveAttribute('href', '')
        await expect(check).toHaveClass('btn btn-success btn-lg disabled')
    })
})
