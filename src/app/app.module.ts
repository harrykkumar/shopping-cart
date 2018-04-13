import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HttpModule} from '@angular/http';

import { AuthService} from './service/auth.service';
import { CartService} from './service/cart.service';

import { AuthGuard}  from './guards/auth.guard';
import { NotAuthGuard}  from './guards/notAuth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { DialogitemComponent } from './dialogitem/dialogitem.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CartComponent,
    DialogitemComponent
  ],
  imports: [
    
    BrowserModule, BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],

  entryComponents:[
DialogitemComponent
],

  providers: [AuthService, CartService,AuthGuard
,NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
