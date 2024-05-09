import {test, expect, Locator} from '@playwright/test';
import {TotalButtonDisabledAdultsChildren, TotalButtonEnabledAdultsChildren, ButtonsDisabledSelectHotel} from "../../utils";
let buttonDisabled: TotalButtonDisabledAdultsChildren
let buttonEnabled: TotalButtonEnabledAdultsChildren
let buttonsDisabled: ButtonsDisabledSelectHotel
let children: Locator
let small: Locator
test.describe("children validation with #total & #check button validation", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/reservation')
        children = page.locator('#children')
        small = page.locator('small')
        await page.locator('#hotels').selectOption('Jumeirah')
        buttonEnabled = new TotalButtonEnabledAdultsChildren(page)
        buttonDisabled = new TotalButtonDisabledAdultsChildren(page)
        buttonsDisabled = new ButtonsDisabledSelectHotel(page)
    })
    test("default number of children is visible", async () => {
        await expect(children).toHaveValue('0')
        await buttonEnabled.checkEnabled()
    })
    test("number of children is correct", async () => {
        await children.focus()
        await buttonEnabled.checkEnabled()
        await children.fill('1')
        await buttonEnabled.checkEnabled()
        await expect(small).toBeHidden()
        await children.focus()
        await children.clear()
        await buttonEnabled.checkEnabled()
        await children.fill('40')
        await buttonEnabled.checkEnabled()
        await expect(small).toBeHidden()
    })
    test("number of children is incorrect", async () => {
        await children.focus()
        await buttonEnabled.checkEnabled()
        await children.fill('-1')
        await buttonDisabled.checkDisabled()
        await expect(small).toBeVisible()
        await expect(small).toContainText('Between 1 and 40 required.')
        await children.focus()
        await children.clear()
        await buttonEnabled.checkEnabled()
        await children.fill('41')
        await buttonDisabled.checkDisabled()
        await expect(small).toBeVisible()
        await expect(small).toContainText('Between 1 and 40 required.')
    })
    test("validation works after blur - number of children not required", async () => {
        await children.focus()
        await buttonEnabled.checkEnabled()
        await children.blur()
        await buttonEnabled.checkEnabled()
        await expect(small).toBeHidden()
    })
    test("number of children resets correctly", async ({page}) => {
        await children.focus()
        await buttonEnabled.checkEnabled()
        await children.fill('10')
        await buttonEnabled.checkEnabled()
        await page.click('#clear')
        await buttonsDisabled.checkMessage()
        await expect(children).toHaveValue('0')
    })
})
