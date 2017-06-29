import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'cart',
  styles: [`
  `],
  template: `
    
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>Cart</h1>

          <h3 *ngIf="!cartProducts.length">Cart is empty</h3>

          <button md-raised-button color="accent" (click)="clearCart()" *ngIf="cartProducts.length" style="margin-bottom: 20px;">
            <md-icon>delete</md-icon>
            Clear cart
          </button>

          <md-card *ngFor="let product of cartProducts" style="margin-bottom: 10px;">
            {{ product.id }} - {{ product.title }}

            <button md-button color="accent"
                    (click)="deleteProductFromCart(product)"
                    style="float: right;color: #000000;">
              <md-icon>delete</md-icon>
            </button>
          </md-card>
        </div>
      </div>
    </div>
    
  `
})
export class CartComponent implements OnInit {

  public cartProducts: any = [];

  constructor(
    public route: ActivatedRoute,
    public snackBar: MdSnackBar,
  ) {}

  public ngOnInit() {
      this.cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
  }

  deleteProductFromCart(product): void{

    let index = this.cartProducts.findIndex(function (cardProduct) {
      return cardProduct.id === product.id;
    });

    if(index > -1){
      this.cartProducts.splice(index,1);
      localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));

      this.snackBar.open(`Product ${product.title} was deleted!`, '', {
        duration: 2000
      });

    }

  }


  clearCart(): void {

    localStorage.removeItem('cartProducts');
    this.cartProducts = [];

    this.snackBar.open(`All products was deleted form cart!`, '', {
      duration: 2000
    });
    console.log('cartProducts is cleared');
  }


}
