import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
//import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'; //factory operator
import { AppUser } from 'shared/models/app-user';

@Injectable()
export class AuthService {
  //end$ observable
  //async pipe subscribes and destroys observable
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute) {
  this.user$ = afAuth.authState;
  }

  login(){

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    let provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider).then(function(result) {
      console.log('Result Object: ');
      console.log(result);
      }).catch(function(error: Error) {
        console.log('Error Object: ');
        console.log(error);
      });


  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.user$
      .switchMap( user => 
      { if (user)
        return this.userService.get(user.uid);
        return Observable.of(null);
      });
  }

}
