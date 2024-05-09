import {test, expect, Locator} from '@playwright/test';
import {TotalButtonDisabledAdultsChildren, TotalButtonEnabledAdultsChildren, ButtonsDisabledSelectHotel} from "../../utils";
let adults: Locator
let small: Locator
let buttonDisabled: TotalButtonDisabledAdultsChildren
let buttonEnabled: TotalButtonEnabledAdultsChildren
let buttonsDisabled: ButtonsDisabledSelectHotel
test.describe("adults validation with #total & #check button validation", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/reservation')
        adults = page.locator('#adults')
        small = page.locator('small')
        await page.locator('#hotels').selectOption('Jumeirah')
        buttonDisabled = new TotalButtonDisabledAdultsChildren(page)
        buttonEnabled = new TotalButtonEnabledAdultsChildren(page)
        buttonsDisabled = new ButtonsDisabledSelectHotel(page)
    })
    test("default number of adults is visible", async () => {
        await expect(adults).toHaveValue('1')
        await buttonEnabled.checkEnabled()
    })
    test("number of adults is correct", async () => {
        await adults.focus()
        await buttonDisabled.checkDisabled()
        await adults.fill('1')
        await buttonEnabled.checkEnabled()
        await expect(small).toBeHidden()
        await adults.focus()
        await adults.clear()
        await buttonDisabled.checkDisabled()
        await adults.fill('40')
        await buttonEnabled.checkEnabled()
        await expect(small).toBeHidden()
    })
    test("number of adults is incorrect", async () => {
        await adults.focus()
        await buttonDisabled.checkDisabled()
        await adults.fill('-1')
        await buttonDisabled.checkDisabled()
        await expect(small).toBeVisible()
        await expect(small).toContainText('Between 1 and 40 required.')
        await adults.focus()
        await adults.clear()
        await buttonDisabled.checkDisabled()
        await adults.fill('41')
        await buttonDisabled.checkDisabled()
        await expect(small).toBeVisible()
        await expect(small).toContainText('Between 1 and 40 required.')
    })
    test("validation works after blur", async () => {
        await adults.focus()
        await buttonDisabled.checkDisabled()
        await adults.blur()
        await buttonDisabled.checkDisabled()
        await expect(small).toBeVisible()
        await expect(small).toContainText('Between 1 and 40 required.')
    })
    test("number of adults resets correctly", async ({page}) => {
        await adults.focus()
        await buttonDisabled.checkDisabled()
        await adults.fill('10')
        await buttonEnabled.checkEnabled()
        await page.click('#clear')
        await buttonsDisabled.checkMessage()
        await expect(adults).toHaveValue('1')
    })
})
