import {test, expect} from '@playwright/test';
import {ButtonValidation, FocusAndBlurNumber1, FocusAndBlurNumber2, HTMLValidator, SmallsValidation} from "../../utils";
let validator: HTMLValidator
let validateButtons: ButtonValidation
let focusAndBlur1: FocusAndBlurNumber1
let focusAndBlur2: FocusAndBlurNumber2
let validateSmalls: SmallsValidation

test.describe("check options- validation of one item with blur", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/index')
        validator = new HTMLValidator(page)
        validateButtons = new ButtonValidation(page)
        focusAndBlur1 = new FocusAndBlurNumber1(page)
        focusAndBlur2 = new FocusAndBlurNumber2(page)
        validateSmalls = new SmallsValidation(page)
        await validateSmalls.checkNotExisting()
    })
    test("input only second item", async ({page}) => {
        await (page.locator('#num2')).fill('10')
        const small2 = page.locator('.small2')
        await expect(small2).toBeHidden()
        await focusAndBlur1.checkExisting1()
        await validateButtons.checkDisability()
        const check1 = await validator.checkValidity('num1')
        const check2 = await validator.checkValidity('num2')
        expect(check1).toBe(false)
        expect(check2).toBe(true)
    })
    test("input only first item", async ({page}) => {
        await (page.locator('#num1')).fill('10')
        const small1 = page.locator('.small1')
        await expect(small1).toBeHidden()
        await focusAndBlur2.checkExisting2()
        await validateButtons.checkDisability()
        const check1 = await validator.checkValidity('num1')
        const check2 = await validator.checkValidity('num2')
        expect(check1).toBe(true)
        expect(check2).toBe(false)
    })
    test("input no item", async () => {
        await focusAndBlur1.checkExisting1()
        await focusAndBlur2.checkExisting2()
        await validateButtons.checkDisability()
        const check1 = await validator.checkValidity('num1')
        const check2 = await validator.checkValidity('num2')
        expect(check1).toBe(false)
        expect(check2).toBe(false)
    })
})
