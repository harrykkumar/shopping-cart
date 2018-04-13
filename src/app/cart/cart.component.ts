import { Component, OnInit } from '@angular/core';
import { AuthService} from '../service/auth.service';
import { CartService} from '../service/cart.service';
import { Router }  from '@angular/router';
import { NgModule } from '@angular/core';

// import { FlashMessagesService } from 'angular2-flash-messages';
 
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cartItemList=[]; 
    totalPrice = 0
totalItem;
toatal = 0;
messageClass;
message;
  cartItems = [];


  constructor( public authService : AuthService  ,public  router :Router, private cartService:CartService) { 
    this.cartItems= this.cartService.data;
    this.cartService.getCartItem().subscribe(e=>{
      this.cartItems=e;
    });
  }

  ngOnInit() {
       this.authService.getCartItems().subscribe(data=>{
                  this.cartItemList = data.items;
                  this.totalItem = this.cartItemList.length > 0 ? this.cartItemList.length  : "No Item";
                  this.cartItemList.forEach(e=>{
                        this.totalPrice  =   this.totalPrice  + e.price;
                  });
              })
  }

paymentForItem(item){
          this.authService.paymentItem(item.map(e=>e._id)).subscribe(data=>{
          if(!data.success){
                this.messageClass = 'alert alert-danger';
                this.message = data.message;
          }
          else{
            this.messageClass = 'alert alert-success';
                this.message = data.message;
                                setTimeout(()=>{
                   this.router.navigate(['/home']);
                        
            },500)
          }

        })

}

}
