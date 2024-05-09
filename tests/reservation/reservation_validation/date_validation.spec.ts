import {test, expect, Locator} from '@playwright/test';
let initialCheckIn: string
let initialCheckOut: string
let checkIn: string
let checkOut: string
let from: Locator
let to: Locator

test.describe("date validation", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/reservation')
        const today = new Date()
        initialCheckIn = today.toISOString().split('T')[0]

        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        initialCheckOut = tomorrow.toISOString().split('T')[0]

        checkIn = initialCheckOut

        const edit = new Date(tomorrow)
        edit.setDate(edit.getDate() + 1)
        checkOut = edit.toISOString().split('T')[0]

        from = page.locator('#from')
        to = page.locator('#to')

    })
    test("initial date from is correct", async () => {
        await expect(from).toHaveValue(initialCheckIn)
        await expect(from).toHaveAttribute('min', initialCheckIn)
    })
    test("initial date to is correct", async () => {
        await expect(to).toHaveValue(initialCheckOut)
        await expect(to).toHaveAttribute('min', initialCheckOut)
    })
    test("date is changing correctly", async () => {
        await from.fill(checkIn)
        await expect(to).toHaveValue(checkOut)
        await expect(to).toHaveAttribute('min', checkOut)
    })
    test("date is resetting correctly", async ({page}) => {
        await from.fill(checkIn)
        await expect(to).toHaveValue(checkOut)
        await expect(to).toHaveAttribute('min', checkOut)
        await page.click('#clear')
        await expect(from).toHaveValue(initialCheckIn)
        await expect(from).toHaveAttribute('min', initialCheckIn)
        await expect(to).toHaveValue(initialCheckOut)
        await expect(to).toHaveAttribute('min', initialCheckOut)
    })
})
