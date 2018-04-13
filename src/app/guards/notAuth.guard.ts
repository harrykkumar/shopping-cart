import{Injectable} from '@angular/core';
import{
	CanActivate,Router
} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

	constructor( public authService:AuthService, public router : Router){}
canActivate() {
if(this.authService.loggedIn()){	
  	this.router.navigate(['/']);
	return false;	
  }
  else{
  	return true;
  }
}
}