import {
  Component, OnDestroy,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { SharedService } from '../../shared/shared.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdSnackBar } from '@angular/material';
import * as _ from 'lodash';
import { Product } from '../../_models/shipment';
import { Review } from '../../_models/review';
import { CreateReview } from '../../_models/createReview';


@Component({
  selector: 'child-product',
  styleUrls: [
    './child-product.component.scss'
  ],
  templateUrl: './child-product.component.html',
})

export class ChildProductComponent implements OnInit,OnDestroy {

  private product: Product = new Product();
  private reviews: Review[] = [];
  private userReview: CreateReview = new CreateReview();
  private productId: number;
  private reviewsLoaded: boolean = false;
  private productRateBlocked: boolean = false;
  private addReviewProcess: boolean = false;
  private sub: any;

  public preloaderColor:string = 'praimry';
  public preloaderMode:string = 'indeterminate';

  constructor(
    private location: Location,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    public toastr: ToastsManager,
    public snackBar: MdSnackBar,
    public vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.productId = +params['id'];
    });

    this.product = this.sharedService.getProductById(this.productId);

    if(!this.product){
      this.sharedService.getProducts()
        .map(response => response.json())
        .subscribe(result => {
          this.sharedService.setProducts(result);
          this.product = this.sharedService.getProductById(this.productId);
        });
    }

    this.sharedService.getReviewsByProductId(this.productId)
      .delay(1000)
      .subscribe(result => {
        this.reviews = _.orderBy(result, ['id'], ['desc']);
        this.reviewsLoaded = true;
      });
  }

  public ngOnDestroy(){
    console.log('Child product DESTROY');
  }

  goBack(): void {
    this.location.back();
  }

  addReview(): void {
    this.addReviewProcess = true;
    this.userReview.product = this.productId;
    this.sharedService.setProductRate(this.userReview)
      .finally(() => this.addReviewProcess = false)
      .subscribe(
        result => {
          this.productRateBlocked = true;
          this.reviewsLoaded = false;

          this.sharedService.getReviewsByProductId(this.productId)
            .delay(1000)
            .subscribe(result => {
              this.reviews = _.orderBy(result, ['id'], ['desc']);
              this.reviewsLoaded = true;
            });

          this.snackBar.open('Reviews added', '', {
            duration: 2000
          });

        },
        error => {
          let parseError = JSON.parse(error._body);
          this.toastr.error(parseError.detail);
        }
      );
  }

  orderReviews(orderBy: string){
    this.reviews = _.orderBy(this.reviews, [orderBy], ['desc']);
  }


}
