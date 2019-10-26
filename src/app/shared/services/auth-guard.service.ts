import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { AuthService } from 'shared/services/auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate{



  constructor(private auth: AuthService, private router: Router) {}

   canActivate(route, state: RouterStateSnapshot){
      //CanActivate cannot return an observable
      //CanActivate inmediately returns true or false, or an observable of a boolean
      //Must use MAP to transform an observable to an observable of a boolean
      //this method returns an observable of a boolean
      return this.auth.user$.map( user => {
        if ( user )
        return true;
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
      }
      )
   }
    
}
