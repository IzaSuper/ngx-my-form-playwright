import {test, expect} from '@playwright/test';
import {typeCorrectNumbers} from "../utils";

let typeNumbers: typeCorrectNumbers
test.describe("clear data", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/index')
        typeNumbers = new typeCorrectNumbers(page)
        await typeNumbers.create(5, 7)
    })
    test("clear data with only array", async ({page}) => {
        await page.click('#createArray')
        await expect(page.locator('#array')).toContainText('5,6,7')
        await expect(page.locator('#sum')).not.toContainText('12')
        await page.click('#reset')
        await expect(page.locator('#array')).not.toContainText('5,6,7')
    })
    test("clear data with only sum", async ({page}) => {
        await page.click('#createSum')
        await expect(page.locator('#array')).not.toContainText('5,6,7')
        await expect(page.locator('#sum')).toContainText('12')
        await page.click('#reset')
        await expect(page.locator('#sum')).not.toContainText('12')
    })
    test("clear data with array and sum", async ({page}) => {
        await page.click('#createArray')
        await page.click('#createSum')
        await expect(page.locator('#array')).toContainText('5,6,7')
        await expect(page.locator('#sum')).toContainText('12')
        await page.click('#reset')
        await expect(page.locator('#array')).not.toContainText('5,6,7')
        await expect(page.locator('#sum')).not.toContainText('12')
    })
})
