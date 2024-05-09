import {expect, Locator, Page} from '@playwright/test'

//index
export class typeCorrectNumbers {
    private readonly num1: Locator
    private readonly num2: Locator
    constructor(page: Page) {
        this.num1 = page.locator('#num1')
        this.num2 = page.locator('#num2')
    }
    async create(number1: number, number2: number) {
        await this.num1.fill(number1.toString())
        await this.num2.fill(number2.toString())
    }
}

export class ButtonValidation {
    private readonly createArray: Locator
    private readonly createSum: Locator

    constructor(page: Page) {
        this.createArray = page.locator('#createArray')
        this.createSum = page.locator('#createSum')
    }

    async checkDisability() {
        await expect(this.createArray).toBeDisabled()
        await expect(this.createSum).toBeDisabled()
    }
}

export class SmallsValidation {
    private readonly small1: Locator
    private readonly small2: Locator

    constructor(page: Page) {
        this.small1 = page.locator('.small1')
        this.small2 = page.locator('.small2')
    }

    async checkNotExisting() {
        await expect(this.small1).toBeHidden()
        await expect(this.small2).toBeHidden()
    }
}

export class HTMLValidator {
    constructor(private readonly page: Page) {}
    async checkValidity(selector: string) {
        return await this.page.evaluate((id) => {
            const input = document.getElementById(id) as HTMLInputElement
            return input.checkValidity()
        }, selector)
    }
}

export class HTMLValidatorMessage {
    constructor(private readonly page: Page) {}
    async checkMessage(selector: string) {
        return await this.page.evaluate((id) => {
            const input = document.getElementById(id) as HTMLInputElement
            return input.validationMessage
        }, selector)
    }
}

export class FocusAndBlurNumber1 {
    private readonly num1: Locator
    private readonly small1: Locator

    constructor(page: Page) {
        this.num1 = page.locator('#num1')
        this.small1 = page.locator('.small1')
    }

    async checkExisting1() {
        await this.num1.focus()
        await this.num1.blur()
        await expect(this.small1).toBeVisible()
        await expect(this.small1).toContainText('Number1 is required')
    }
}

export class FocusAndBlurNumber2 {
    private readonly num2: Locator
    private readonly small2: Locator

    constructor(page: Page) {
        this.num2 = page.locator('#num2')
        this.small2 = page.locator('.small2')
    }

    async checkExisting2() {
        await this.num2.focus()
        await this.num2.blur()
        await expect(this.small2).toBeVisible()
        await expect(this.small2).toContainText('Number2 is required')
    }
}

export class CheckInvalid1Message {
    private readonly noItem1: Locator
    private readonly invalidItem1: Locator

    constructor(page: Page) {
        this.noItem1 = page.locator('#noItem1')
        this.invalidItem1 = page.locator('#invalidItem1')
    }

    async message1() {
        await expect(this.noItem1).toBeHidden()
        await expect(this.invalidItem1).toContainText('Number1 has to be between -10 and 10.')
    }
}

export class CheckInvalid2Message {
    private readonly noItem2: Locator
    private readonly invalidItem2: Locator

    constructor(page: Page) {
        this.noItem2 = page.locator('#noItem2')
        this.invalidItem2 = page.locator('#invalidItem2')
    }

    async message2() {
        await expect(this.noItem2).toBeHidden()
        await expect(this.invalidItem2).toContainText('Number2 has to be between -10 and 10.')
    }
}

//reservation

export class CreateReservation {
    private readonly hotel: Locator
    private readonly from: Locator
    private readonly to: Locator
    private readonly adults: Locator
    private readonly children: Locator
    private readonly total: Locator
    constructor(private readonly page: Page) {
        this.hotel = this.page.locator('#hotels')
        this.from = this.page.locator('#from')
        this.to = this.page.locator('#to')
        this.adults = this.page.locator('#adults')
        this.children = this.page.locator('#children')
        this.total = this.page.locator('#total')
    }

    async typeCheckInDate() {
        const today = new Date()
        today.setDate(today.getDate() + 1)
        const checkIn = today.toISOString().split('T')[0]
        await this.from.fill(checkIn)
    }

    async typeCheckOutDate() {
        const today = new Date()
        today.setDate(today.getDate() + 3)
        const checkOut = today.toISOString().split('T')[0]
        await this.to.fill(checkOut)
    }
    async create(options: {
        hotel?: string;
        from?: boolean;
        to?: boolean;
        adults?: number;
        children?: number;
    } = {}) {
        const {hotel, from, to, adults, children} = options;
        if (hotel) {
            await this.hotel.selectOption(hotel)
        }
        if (from) {
            await this.typeCheckInDate()
        }
        if (to) {
            await this.typeCheckOutDate()
        }
        if (adults) {
            await this.adults.fill(adults.toString())
        }
        if (children) {
            await this.children.fill(children.toString())
        }
        await this.total.click()
    }
}

export class ButtonsDisabledSelectHotel {
    private readonly hotel: Locator
    private readonly message: Locator
    private readonly total: Locator
    private readonly check: Locator
    constructor(private readonly page: Page) {

            this.hotel = this.page.locator('#hotels')
            this.message = this.page.locator('#message')
            this.total = this.page.locator('#total')
            this.check = this.page.locator('#check')
    }
    async checkMessage() {
        await expect(this.hotel).toHaveValue('')
        await expect(this.message).toContainText('Please choose a hotel from the menu')
        await expect(this.total).toBeDisabled()
        await expect(this.check).toHaveClass('btn btn-success btn-lg disabled')
    }
}
export class TotalButtonDisabledAdultsChildren {
    private readonly total: Locator
    private readonly check: Locator
    constructor(private readonly page: Page) {
        this.total = this.page.locator('#total')
        this.check = this.page.locator('#check')
    }
    async checkDisabled() {
        await expect(this.total).toBeDisabled()
        await expect(this.check).toHaveClass('btn btn-success btn-lg')
    }
}
export class TotalButtonEnabledAdultsChildren {
    private readonly total: Locator
    private readonly check: Locator
    constructor(private readonly page: Page) {
        this.total = this.page.locator('#total')
        this.check = this.page.locator('#check')
    }
    async checkEnabled() {
        await expect(this.total).toBeEnabled()
        await expect(this.check).toHaveClass('btn btn-success btn-lg')
    }
}









