import {test, expect, Locator} from '@playwright/test';
import {ButtonsDisabledSelectHotel} from "../../utils";

let disabled: ButtonsDisabledSelectHotel
let hotels: Locator
let message: Locator

test.describe("hotels validation", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/reservation')
        hotels = page.locator('#hotels')
        message = page.locator('#message')
        disabled = new ButtonsDisabledSelectHotel(page)
    })
    test("two options to select are visible", async ({page}) => {
        const options = page.locator('option')
        await expect(options).toHaveCount(2)
        await expect(options.nth(0)).toHaveText('Five Jumeirah Village')
        await expect(options.nth(1)).toHaveText('TRYP by Wyndham Dubai')
    })
    test("price of Jumeirah is visible", async () => {
        await hotels.selectOption('Jumeirah')
        await expect(hotels).toHaveValue('Jumeirah')
        await expect(message).toContainText('adult: 200$/night. child: 100$/night')
    })
    test("price of TRYP is visible", async () => {
        await hotels.selectOption('TRYP')
        await expect(hotels).toHaveValue('TRYP')
        await expect(message).toContainText('adult: 150$/night. child: 70$/night')
    })
    test("hotel validation - no blur", async () => {
        await disabled.checkMessage()
    })
    test("hotel validation - with blur", async () => {
        await hotels.focus()
        await hotels.blur()
        await disabled.checkMessage()
    })
    test("select hotel is resetting correctly", async ({page}) => {
        await hotels.selectOption('Jumeirah')
        await expect(page.locator('#total')).toBeEnabled()
        await expect(page.locator('#check')).toHaveClass('btn btn-success btn-lg')
        await page.click('#clear')
        await disabled.checkMessage()
    })
})
