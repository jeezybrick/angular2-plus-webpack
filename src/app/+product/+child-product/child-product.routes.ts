import { ChildProductComponent } from './child-product.component';
import { AuthGuard } from './../../_guards';

export const routes = [
  { path: '', component: ChildProductComponent,  pathMatch: 'full' , canActivate: [AuthGuard], data : {some_data : 'some value'}},
];
