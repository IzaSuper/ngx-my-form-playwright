import {test, expect} from '@playwright/test';
import {HTMLValidatorMessage, CheckInvalid1Message, CheckInvalid2Message, ButtonValidation} from "../../utils";
let validatorMessage: HTMLValidatorMessage
let invalid1Message: CheckInvalid1Message
let invalid2Message: CheckInvalid2Message
let validateButtons: ButtonValidation
let num1: any
let num2: any
let small1: any
let small2: any

test.describe("check options - typing two items", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/index')
        validatorMessage = new HTMLValidatorMessage(page)
        invalid1Message = new CheckInvalid1Message(page)
        invalid2Message = new CheckInvalid2Message(page)
        validateButtons = new ButtonValidation(page)
        num1 = page.locator('#num1')
        num2 = page.locator('#num2')
        small1 = page.locator('.small1')
        small2 = page.locator('.small2')
    })
    test("input two correct items", async ({page}) => {
        await num1.fill('-10')
        await expect(small1).not.toBeVisible()
        await num2.fill('10')
        await expect(small2).not.toBeVisible()
        await expect(page.locator('#createArray')).not.toBeDisabled()
        await page.click('#createArray')
        await expect(page.locator('#array')).toContainText('-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10')
        await expect(page.locator('#createSum')).not.toBeDisabled()
        await page.click('#createSum')
        await expect(page.locator('#sum')).toContainText('Sum of two numbers is 0')
    })
    test("input first item less than required", async () => {
        await num1.fill('-11')
        await invalid1Message.message1()
        await num2.fill('10')
        await expect(small2).not.toBeVisible()
        await validateButtons.checkDisability()
        const message1 = await validatorMessage.checkMessage('num1')
        expect(message1).toContain('Value must be greater than or equal to -10')
    })
    test("input first item greater than required", async () => {
        await num1.fill('11')
        await invalid1Message.message1()
        await num2.fill('10')
        await expect(small2).not.toBeVisible()
        await validateButtons.checkDisability()
        const message1 = await validatorMessage.checkMessage('num1')
        expect(message1).toContain('Value must be less than or equal to 10')
    })
    test("input second item less than required", async () => {
        await num1.fill('-9')
        await expect(small1).not.toBeVisible()
        await num2.fill('-11')
        await invalid2Message.message2()
        await validateButtons.checkDisability()
        const message2 = await validatorMessage.checkMessage('num2')
        expect(message2).toContain('Value must be greater than or equal to -10')
    })
    test("input second item greater than required", async () => {
        await num1.fill('-9')
        await expect(small1).not.toBeVisible()
        await num2.fill('11')
        await invalid2Message.message2()
        await validateButtons.checkDisability()
        const message2 = await validatorMessage.checkMessage('num2')
        expect(message2).toContain('Value must be less than or equal to 10')
    })
})
