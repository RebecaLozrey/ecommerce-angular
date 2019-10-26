import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor( private auth: AuthService, private userService: UserService ) { }

  canActivate(): Observable<boolean>{
    return this.auth.appUser$
      .map( appUser => appUser.isAdmin );
  }

}
  // AuthService type returns un object to authenticate to google 
  // UserService type returns un object to save and get users from the database
  // switchMap returns the subtype of the type, not an observable
  //map waits for an observable and gets the object
  //map returns an observable of a boolean
  //CanActivate cannot return an observable of any according to documentation
  //CanActivate inmediately returns a boolean, or an observable of a boolean
  //Must use MAP to transform an observable to an observable of a boolean
  //This method returns an observable of a boolean
  //SwitchMap method returns an object of any