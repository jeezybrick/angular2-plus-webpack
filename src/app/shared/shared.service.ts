import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core'
import { Http, Headers, RequestOptions} from '@angular/http';
import { AuthenticationService } from '../_services/index';
import { HttpService } from './services/http.service';
import { Observable } from 'rxjs';
import { Review } from '../_models/review';
import { User } from '../_models/user';

@Injectable()
export class SharedService {
  @Output() fire: EventEmitter<any> = new EventEmitter();
  public products: any = [];
  public currentUser: any = this.authenticationService.getAuthUser();
  private userToken = this.currentUser ? this.currentUser.token:'';

  constructor(
    private http: HttpService,
    private authenticationService: AuthenticationService
  ) {console.log('shared service started');}

  change() {
    console.log('change started');
    this.fire.emit(false);
  }

  getEmittedValue() {
    return this.fire;
  }

  setProducts(products){
    this.products = products;
  }

  getProducts(){
    return this.http.get('http://smktesting.herokuapp.com/api/products/');
  }

  setProductsByQuery(){
    this.http.get('http://smktesting.herokuapp.com/api/products/')
      .map(response => response.json())
      .subscribe(result => {
        this.products = result;
      });
  }

  getProductById(id){

    let index = this.products.findIndex(function (product) {
      return product.id === id;
    });


    if(index > -1){
      return this.products[index];
    }
    return false;
  }

  getReviewsByProductId(id): Observable<Review[]>{
    return this.http.get(`http://smktesting.herokuapp.com/api/reviews/${id}`).map(response => {
      let resp = response.json();
      resp = resp.map(item => {
        let user = new User(item['created_by']);
        return new Review(item['id'], item['product'], item['rate'],item['text'],item['created_at'],user)
      });
      return resp;

    });
  }

  setProductRate(data){
    return this.http.post(`http://smktesting.herokuapp.com/api/reviews/${data.product}`, JSON.stringify(data)).map(response => {
      response.json();

    });
  }

}
