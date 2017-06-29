import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { AuthComponent } from './auth';
import { NoContentComponent } from './no-content';
import { AuthGuard } from './_guards';
import { CartComponent } from './cart';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'home',  component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'auth',  component: AuthComponent },
  { path: 'cart', component: CartComponent , canActivate: [AuthGuard]},
  { path: 'product', loadChildren: './+product#ProductModule'},
  { path: '**',    component: NoContentComponent },
];
