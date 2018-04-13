import { Component, OnInit,Inject  } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import { Router }  from '@angular/router';
import { AuthService} from '../service/auth.service';
import { CartService} from '../service/cart.service';


@Component({
  selector: 'app-dialogitem',
  templateUrl: './dialogitem.component.html',
  styleUrls: ['./dialogitem.component.css']
})
export class DialogitemComponent implements  OnInit  {
removeButtonEnableFlag= false;
addCartBtnEnableFlag = true;
selectItemList=[];dataList=[];
	checkBtn = false;
  messageClass;
message;cartItemList=[]
  cartItems = [];
// data = [];
  constructor(public authService: AuthService  , public router :Router, public thisDialogRef : MatDialogRef<DialogitemComponent>,@Inject(MAT_DIALOG_DATA)  public data:Array<DialogitemComponent>, public cartService:CartService) { 
     this.cartItems = this.cartService.data;
    this.cartService.getCartItem().subscribe(e=>{
      this.cartItems=e;
    });
  }

  ngOnInit() {
this.cartItem();

  }
cartItem(){
          this.authService.getCartItems().subscribe(data=>{ 
                  this.cartItemList = data.items;
                  if(this.cartItemList.length > 0){
                   this.checkBtn = true;
                  }
                  else{
                   this.checkBtn = false;
                  }        
        })
}

addtoCartItem(selectItem){ 
        this.authService.addedTocartItem(selectItem).subscribe(data=>{
          this.cartService.addToCart((this.data as any)._id);
          if(!data.success){
                this.messageClass = 'alert alert-danger';
                this.message = data.message;
          }
          else{
                this.cartItem();
                this.messageClass = 'alert alert-success';
                this.message = data.message;       
          }

        })


}
removeItem(id){           
        this.authService.deleteItemFromCart(id).subscribe(data=>{
          this.cartService.removeFromCart(id);
          if(!data.success){
                this.messageClass = 'alert alert-danger';
                this.message = data.message;
          }
          else{
                // this.cartItem();
                this.messageClass = 'alert alert-success';
                this.message = data.message;           
          }

        })

}

checkOutBtn(){
	this.onCloseCancel();
	this.router.navigate(['/cart']);

}
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }

}
