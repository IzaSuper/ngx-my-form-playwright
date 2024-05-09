import { Component } from '@angular/core';
import { FormComponent} from "./form/form.component";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-reservation',
    standalone: true,
    imports: [FormComponent, ReactiveFormsModule],
    templateUrl: './reservation.component.html',
    styleUrl: './reservation.component.css'
})
export class ReservationComponent {

}