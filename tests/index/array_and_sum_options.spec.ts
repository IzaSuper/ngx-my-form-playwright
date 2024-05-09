import {test, expect} from '@playwright/test';
import {typeCorrectNumbers} from "../utils";

let typeNumbers: typeCorrectNumbers
test.describe("array and sum options", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/index')
        typeNumbers = new typeCorrectNumbers(page)
        await typeNumbers.create(5, 7)
        await page.click('#createArray')
        await page.click('#createSum')
    })
    test("array and sum is correct", async ({page}) => {
        await expect(page.locator('#array')).toContainText('5,6,7')
        await expect(page.locator('#sum')).toContainText('12')
    })
    test("array and sum change after type another number", async ({page}) => {
        await (page.locator('#num1')).focus()
        await (page.locator('#num1')).fill('3')
        await page.click('#createArray')
        await expect(page.locator('#array')).toContainText('3,4,5,6,7')
    })
})
