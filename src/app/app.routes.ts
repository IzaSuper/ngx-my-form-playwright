import { Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {ReservationComponent} from "./reservation/reservation.component";
import {HomeComponent} from "./home/home.component";


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'index', component: IndexComponent},
    {path: 'reservation', component: ReservationComponent}
];