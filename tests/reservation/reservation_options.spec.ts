import {test, expect, Locator} from '@playwright/test';
import {CreateReservation} from "../utils";

let reservation: CreateReservation
let total: Locator
let checkIn1: string
let checkOut2: string
test.describe("Reservation options", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/reservation')
        reservation = new CreateReservation(page)
        await reservation.create(
            {
                hotel: "Jumeirah",
                from: true,
                to: true,
                adults: 2,
                children: 1
            })
        total = page.locator('#total')
        const today = new Date()
        checkIn1 = today.toISOString().split('T')[0]
        const edit = new Date(today)
        edit.setDate(edit.getDate() + 5)
        checkOut2 = edit.toISOString().split('T')[0]
    })
    test("create simple reservation", async ({page}) => {
        await expect(total).toBeEnabled()
        await expect(total).toContainText('Total cost is 1000$')
        await expect(page.locator('#check')).toHaveClass('btn btn-success btn-lg')

    })
    test("price automatically changes after change parameters", async ({page}) => {
        await page.locator('#adults').focus()
        await page.locator('#adults').fill('3')
        await expect(total).toContainText('Total cost is 1400$')
        await page.locator('#hotels').selectOption('TRYP')
        await expect(total).toContainText('Total cost is 1040$')
        await page.locator('#children').focus()
        await page.locator('#children').fill('3')
        await expect(total).toContainText('Total cost is 1320$')
        await page.locator('#from').fill(checkIn1)
        await expect(total).toContainText('Total cost is 660$')
        await page.locator('#to').fill(checkOut2)
        await expect(total).toContainText('Total cost is 3300$')
    })
})
