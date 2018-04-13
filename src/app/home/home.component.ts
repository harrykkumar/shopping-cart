import { Component, OnInit } from '@angular/core';
import { AuthService} from '../service/auth.service';
import { Router }  from '@angular/router';
import {MatDialogModule} from '@angular/material';
import {MatDialog} from '@angular/material';
import { CartService} from '../service/cart.service';
import { DialogitemComponent } from '../dialogitem/dialogitem.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
dialogResult="";
cartItems= [];btnColor
  constructor(public authService: AuthService, public dialog:MatDialog, private cartService:CartService) {
      this.cartItems = this.cartService.data;;
        this.cartService.getCartItem().subscribe(e=>{
          this.cartItems=e;
        });
   }

  isAdded(item) {
    return this.cartItems.indexOf(item._id)>=0

  }
	
  procductList = [];
  popupFlag
  ngOnInit() {

  this.authService.getAllProduct().subscribe(data =>{
 this.procductList = data.carts;
  	})
  }

openDialog(item) {
    let diaRef = this.dialog.open(DialogitemComponent, {
      width: '800px',
      data: item
    });
    diaRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
    });
  }

}
