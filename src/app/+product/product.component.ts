import {
  Component,
  OnInit,
} from '@angular/core';

import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { MdSnackBar } from '@angular/material';
import { AuthenticationService } from '../_services/authentication.service';
import { Product } from '../_models/shipment';
import { User } from '../_models/user';

@Component({
  selector: 'product',
  styleUrls: [
    './product.component.scss'
  ],
  templateUrl:'./product.component.html',
})

export class ProductComponent implements OnInit {

  public products:Product[] = [];
  public cartProducts:Product[] = [];
  public authUser: User = new User();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private sharedService: SharedService,
    public snackBar: MdSnackBar,
  ) {}

  public ngOnInit() {

    this.authUser = this.authenticationService.getAuthUser();
    this.cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

    this.sharedService.getProducts()
      .map(response => response.json())
      .subscribe(result => {
        this.products = result;
        this.sharedService.setProducts(this.products);
      });
    ;
  }

  gotoDetail(product): void {
    //this.router.navigate(['/product/detail', product.id], { queryParams: { page: 99 }});
  }

  addToCart(product:any){

    this.cartProducts.push(product);
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));

    this.snackBar.open(`Product ${product.title} was added!`, '', {
      duration: 2000
    });

  }

  isProductAlreadyInCart(product): boolean{

    let index = this.cartProducts.findIndex(function (cardProduct) {
      return cardProduct.id === product.id;
    });

    return index === -1;

  }

}
