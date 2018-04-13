import{Injectable} from '@angular/core';
import{
	CanActivate,Router,
	ActivatedRouteSnapshot
	,RouterStateSnapshot
} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
redirecurl;
	constructor( public authService:AuthService, public router : Router){}
canActivate(router : ActivatedRouteSnapshot,
	state :  RouterStateSnapshot) {

if(this.authService.loggedIn()){	
	return true;
  }
  else{
  	this.redirecurl = state.url;
   this.router.navigate(['/login']);
  	return false;
  }
}
}