import { Component, OnInit } from '@angular/core';
import { AuthService} from './service/auth.service';
import { Router }  from '@angular/router';
import { CartService} from './service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

cartItems = [];

constructor( public authService :AuthService,  public  router :Router, private cartService:CartService) {

	this.cartItems = this.cartService.data;
    this.cartService.getCartItem().subscribe(e=>{
      this.cartItems=e;
    });
}
ngOnInit(){	

  this.authService.getCartItems().subscribe(data=>{
                  let dat = data.items;
                  dat = dat.map(e=>e.pid);
                  this.cartItems = dat;
                  this.cartService.addItem(dat);
              })
}



onClickLogout(){
	this.authService.logout();
	this.router.navigate(['/login']);

}


}
