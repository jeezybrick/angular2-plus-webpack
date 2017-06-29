import { ProductComponent } from './product.component';

export const routes = [
  { path: '', children: [
    { path: '', component: ProductComponent },
    { path: 'detail/:id', loadChildren: './+child-product#ChildProductModule'}
  ]},
];
