import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [
        DatePipe
    ],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
    formattedDate : Date = new Date()
    ngOnInit() {
        setInterval( () => {
            this.formattedDate = new Date()
        }, 1000 )
    }
}