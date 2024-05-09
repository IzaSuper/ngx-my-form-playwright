
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";


@Component({
    selector: 'app-form-reservation',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        RouterLink
    ],
    templateUrl: './form.component.html',
    styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

    prices = [
        {
            "name": "Jumeirah",
            "cost": {
                "adults": 200,
                "children": 100
            },
            "message": "adult: 200$/night. child: 100$/night"
        },
        {
            "name": "TRYP",
            "cost": {
                "adults": 150,
                "children": 70
            },
            "message": "adult: 150$/night. child: 70$/night"
        }
    ]
    hotelMap = {
        "Jumeirah": "hotel/ae/sky-villa-penthouse-five-jvc.en-gb.html",
        "TRYP": "hotel/ae/tryp-by-wyndham-dubai.en-gb.html"
    }
    hotelUrl = ''
    selectedHotel: any = ''
    private currentDate = new Date()
    today = this.currentDate.toISOString().split('T')[0]
    private tomorrowDate = new Date(this.currentDate.setDate(this.currentDate.getDate() + 1))
    minCheckOut = this.tomorrowDate.toISOString().split('T')[0]
    private adultPrice = 0
    private childrenPrice = 0
    message = 'Please choose a hotel from the menu'
    total = 0

    reactiveForm = new FormGroup({
        hotel: new FormControl(null, Validators.required),
        from: new FormControl(this.today),
        to: new FormControl(this.minCheckOut),
        adults: new FormControl(1, [Validators.min(1), Validators.max(40), Validators.required]),
        children: new FormControl(0, [Validators.min(0), Validators.max(40)])
    })
    originalValues: any

    ngOnInit() {
        this.originalValues = {...this.reactiveForm.value}
        this.reactiveForm.get('hotel')?.valueChanges.subscribe((selectedHotel) => {
            this.selectedHotel = selectedHotel
            const selected = this.prices.find(element => element.name === selectedHotel)
            if (selected) {
                this.message = selected.message;
                this.adultPrice = selected.cost.adults;
                this.childrenPrice = selected.cost.children;
            }
        })
        this.reactiveForm.get('from').valueChanges.subscribe((from) => {
            const edit = new Date(from)
            edit.setDate(edit.getDate() + 1)
            this.minCheckOut = edit.toISOString().split('T')[0]
            const to = this.minCheckOut
            this.reactiveForm.get('to').setValue(to)
        })
        this.reactiveForm.valueChanges.subscribe(() => {
            this.calculateTotal()
        })
    }

    restrictZero(event:any){
        if(event.target.value.length === 0 && event.key === '0') {
            event.preventDefault();
        }
    }

    resetForm() {
        this.reactiveForm.reset(this.originalValues);
        this.message = 'Please choose a hotel from the menu';
        this.adultPrice = 0;
        this.childrenPrice = 0;
        this.total = 0
        this.hotelUrl = ''
    }

    private calculateTotal() {
        if (this.reactiveForm.invalid) {
            this.total = 0

            return
        }

        const dateFrom = new Date(this.reactiveForm.get('from').value)
        const dateTo = new Date(this.reactiveForm.get('to').value)
        const timeDiff = dateTo.getTime() - dateFrom.getTime();
        const diff = Math.ceil(timeDiff / (1000 * 3600 * 24))
        const adults = this.reactiveForm.get('adults')?.value;
        const children = this.reactiveForm.get('children')?.value;
        this.total = (diff * adults * this.adultPrice) + (diff * children * this.childrenPrice)
    }

    resetAdults(): void {
        this.reactiveForm.get('adults')?.setValue(null);
    }

    resetChildren(): void {
        this.reactiveForm.get('children')?.setValue(null);
    }

    createLink(): string {
        if (this.selectedHotel) {
            const baseUrl = "//www.booking.com/"
            this.hotelUrl = baseUrl + this.hotelMap[this.selectedHotel]
        }
        return this.hotelUrl
    }
}
