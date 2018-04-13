import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Headers,RequestOptions,Http,HttpModule} from '@angular/http';
import {tokenNotExpired} from 'angular2-jwt';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
	domain ="/";
authToken;token;options;
user;headers;
  constructor(
  	private http : Http) { }


createAuthenticationHeaders(){
this.loadToken();
this.options = new RequestOptions({
  headers:new Headers({
    'content-Type':'application/json',
    'authorization':this.authToken
  })

})
};

loadToken(){
  this.authToken = localStorage.getItem('token');
   
}
 // use third lib//
loggedIn(){
return tokenNotExpired();

}

      getAllProduct(){
         return this.http.get(this.domain + 'authentication/getAllProduct/'  ).map(res=>res.json());
      }

      login(user){  
        return  this.http.post(this.domain + 'authentication/login' , user).map((res : any) => res.json())
  }
      addedTocartItem(cartItem){  
          return  this.http.post(this.domain + 'authentication/addToCart' , cartItem).map((res : any) => res.json())
      }

      getCartItems(){
         return this.http.get(this.domain + 'authentication/getAddedCartItem/'  ).map(res=>res.json());
      }
    
     deleteItemFromCart(id){
         return this.http.delete(this.domain + 'authentication/deleteItem/'+ id ).map(res=>res.json());

     }
        paymentItem(item){  
          return  this.http.post(this.domain + 'authentication/paymentItem' , item).map((res : any) => res.json())
      }


logout(){
  this.authToken = null;
    this.user = null;
    localStorage.clear();

}

storeUserData(token,user){
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user));
  this.authToken = token;
  this.user = user;

}


}
