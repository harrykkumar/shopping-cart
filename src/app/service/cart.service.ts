import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Headers,RequestOptions,Http,HttpModule} from '@angular/http';
import {tokenNotExpired} from 'angular2-jwt';

import { Observable }  from 'rxjs/Observable';

@Injectable()
export class CartService {
  cartItems :Observable<Array<any>>;
  observer;
  data = [];

  constructor(
  	private http : Http) { 
    this.cartItems = new Observable(observer => {
          this.observer = observer;
     });

  }    
  addItem(e){
      this.data = e;
      this.observer.next(this.data);
  }

  addToCart(item:any) {
    this.data.push(item);
    this.observer.next(this.data);
  }

   removeFromCart(item:any) {
    let index = this.data.indexOf(item);    
    if(index) {
      this.data.splice(index, 1);
      this.observer.next(this.data);
    }
  }

  getCartItem() {
    return this.cartItems;
  }

}
