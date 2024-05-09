import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";

//import {Event} from "@angular/router";


@Component({
    selector: 'app-form',
    standalone: true,
    imports: [
        FormsModule,
        NgIf
    ],
    templateUrl: './form.component.html',
    styleUrl: './form.component.css'
})
export class FormComponent {

    number1!: number
    number2!: number
    numberReset!: number

    @Output() arrayCalculated = new EventEmitter<number[]>();
    @Output() sumCalculated = new EventEmitter<number>();
    @Output() resetData = new EventEmitter()


    @ViewChild('check') form!: NgForm
    createdArray = (): number[] => {
        const start = Math.min(this.number1, this.number2)
        const end = Math.max(this.number1, this.number2)
        return Array.from({length: end - start + 1}).map((_, key) => key + start);
    }
    createSum = (): number => {
        return this.number1 + this.number2
    }

    stopSubmit(e: KeyboardEvent) {
        if (e.key && e.key === 'Enter') {
            e.preventDefault()
            return;
        }
    }

    checkSubmit(e: any) {

        if (e.submitter.name === 'createArray') {
            this.arrayCalculated.emit(this.createdArray())
        } else if (e.submitter.name === 'createSum') {
            this.sumCalculated.emit(this.createSum())
        }
    }

    clearData = () => {
        this.resetData.emit()
    }

    resetInput1 = () => {
        this.number1 = this.numberReset
    }
    resetInput2 = () => {
        this.number2 = this.numberReset
    }
}