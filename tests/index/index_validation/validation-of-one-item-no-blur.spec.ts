import {test, expect} from '@playwright/test';
import {ButtonValidation, SmallsValidation, HTMLValidator} from "../../utils";
let validator: HTMLValidator
let validateButtons: ButtonValidation
let validateSmalls: SmallsValidation

test.describe("check options- validation of one item - no blur", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/index')
        validator = new HTMLValidator(page)
        validateButtons = new ButtonValidation(page)
        validateSmalls = new SmallsValidation(page)
    })
    test("input only second item", async ({page}) => {
        await (page.locator('#num2')).fill('10')
        await validateSmalls.checkNotExisting()
        await validateButtons.checkDisability()
        const check1 = await validator.checkValidity('num1')
        const check2 = await validator.checkValidity('num2')
        expect(check1).toBe(false)
        expect(check2).toBe(true)
    })
    test("input only first item", async ({page}) => {
        await (page.locator('#num1')).fill('10')
        await validateSmalls.checkNotExisting()
        await validateButtons.checkDisability()
        const check1 = await validator.checkValidity('num1')
        const check2 = await validator.checkValidity('num2')
        expect(check1).toBe(true)
        expect(check2).toBe(false)
    })
    test("input no item", async () => {
        await validateSmalls.checkNotExisting()
        await validateButtons.checkDisability()
        const check1 = await validator.checkValidity('num1')
        const check2 = await validator.checkValidity('num2')
        expect(check1).toBe(false)
        expect(check2).toBe(false)
    })
})
