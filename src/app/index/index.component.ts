import {Component} from '@angular/core';
import { FormComponent } from "./form/form.component";
import { FooterComponent } from "./footer/footer.component";
import {RouterLink} from "@angular/router";
import { FormsModule} from "@angular/forms";

@Component({
    selector: 'app-index',
    standalone: true,
    imports: [FormComponent, FooterComponent, RouterLink, FormsModule],
    templateUrl: './index.component.html',
    styleUrl: './index.component.css'
})
export class IndexComponent {
    array = []
    sum!: number | undefined
    arrayCalculated($event: any) {
        console.log($event)
        this.array = $event
    }
    sumCalculated($event: any) {
        this.sum = $event
    }
    resetData() {
        this.array = []
        this.sum = undefined
    }
}