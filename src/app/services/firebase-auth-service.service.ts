import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
//import 'firebase/auth';
import { Router } from "@angular/router";
import { User } from "../models/user";
import { Observable } from "rxjs";
//import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthServiceService {

  userData: any;
  constructor(public auth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router) {

    //let observableAuth: Observable<User>  = this.auth.authState;
    if (this.auth.authState != null) {
      this.auth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          const userStorage: any = localStorage.getItem('user');
          JSON.parse(userStorage);
        } else {
          localStorage.setItem('user', '{}');
          const userStorage: any = localStorage.getItem('user');
          JSON.parse(userStorage);
        }
      })
    }
  }


  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
      this.SetUserData(result.user);
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      window.alert(error)
    })
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['login']);
  }

  get isLoggedIn(): boolean {
    const userStorage: any = localStorage.getItem('user');
    if (userStorage.length > 2) {
      const user = JSON.parse(userStorage);
      return (user !== null && user.emailVerified !== false) ? true : false;
    } else {
      return false;
    }

  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }


}
