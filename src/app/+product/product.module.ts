import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './product.routes';
import { ProductComponent } from './product.component';

// Material 2
import { MaterialModule } from '@angular/material';
import 'hammerjs';

console.log('`Product` bundle loaded asynchronously');

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    ProductComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
})
export class ProductModule {
  public static routes = routes;
}
