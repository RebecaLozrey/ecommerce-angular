import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from 'shared/models/app-user';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User){
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      //isAdmin: false,
    });
  }

  get(uid: string): FirebaseObjectObservable<AppUser>{
    return this.db.object('/users/' + uid);
  }

  getAll(){
    return this.db.list('/users');
  }
}
