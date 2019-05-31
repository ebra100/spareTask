import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ViewCartComponent } from './view-cart/view-cart.component';


export const routes: Routes = [
    { path: 'Menu', component: MenuComponent },
    { path: 'ViewCart', component: ViewCartComponent },
    { path: '**', component: MenuComponent },

];