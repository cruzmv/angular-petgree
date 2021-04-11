# Petgree

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Lab Notes

bootstrap:
npm install bootstrap --save
add to angular.json: styles: "node_modules/bootstrap/dist/css/bootstrap.min.css"

-----------------------------------------------------------------------------------------------

firebase:
(https://www.positronx.io/full-angular-7-firebase-authentication-system/)
npm install firebase @angular/fire --save
na consol do firebase, configuracoes do projeto, copiar para environments/environment.prod.ts e environment.ts:
firebaseConfig: {
    apiKey: "AIzaSyAVW0D2qgRhkzqE-RHlgzq-PWlrYGMKK2g",
    authDomain: "petgree-a90b0.firebaseapp.com",
    databaseURL: "https://petgree-a90b0-default-rtdb.firebaseio.com",
    projectId: "petgree-a90b0",
    storageBucket: "petgree-a90b0.appspot.com",
    messagingSenderId: "386044091138",
    appId: "1:386044091138:web:13f4104494d18d3c4a401b"
  }

  em app.module.ts:
  import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ]


Criar model:
ng generate interface models/user 
models/user.ts:
export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;    
}


Criar o serviço:
ng g s services/firebase-auth-service

services/firebase-auth-service.ts:
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from "@angular/router";
import { User } from "../models/user";
import { Observable } from "rxjs";

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
    }).catch((error) => {
      window.alert(error)
    })
  }

  logout() {
    this.auth.signOut();
  }

  isLoggedIn(): boolean {
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


services/firebase-auth-service.spec.ts:
import { inject, TestBed } from '@angular/core/testing';

import { FirebaseAuthServiceService } from './firebase-auth-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

const User = {
  uid: '11',
  email: 'm@.com',
  displayName: 'name',
  photoURL: '',
  emailVerified: false
}

describe('FirebaseAuthServiceService', () => {
  let service: FirebaseAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [ 
        {provide: AngularFireAuth, useValue: User },
        {provide: AngularFirestore, useValue: User }
      ]
    });
    service = TestBed.inject(FirebaseAuthServiceService);
  });


  it('should be created', ()  => {
    expect(service).toBeTruthy();
  });

  /*
  it('should be created', inject([Router,AngularFireAuth], (router: Router, auth: AngularFireAuth) => {
    //spyOn(auth, 'getObservable').and.returnValue({subscribe: () => {}});
    expect(service).toBeTruthy();
  }));
  */

});


app.module.ts:
  providers: [
    FirebaseAuthServiceService
  ],



ng g c login
login.component.ts:
constructor(public auth: FirebaseAuthServiceService) { }

login.component.html:
<div *ngIf="auth.isLoggedIn">
    <h1>Hello {{ auth.userData.displayName }}!</h1>
    <button (click)="auth.logout()">Logout</button>
</div>
<div *ngIf="!auth.isLoggedIn" class="login_block">
    <button mat-raised-button color="primary" (click)="auth.login()">Login with Google</button>
</div>

login.component.spec.ts:
      providers: [
        {provide: FirebaseAuthServiceService, useValue: {}}
      ]

-----------------------------------------------------------------------------------------------

Material:
https://material.angular.io/
https://material.io/

ng add @angular/material

-----------------------------------------------------------------------------------------------
jquery:
npm install --save jquery


-----------------------------------------------------------------------------------------------
Firebase deploy:
> ng build --aot --prod --output-hashing none
> npm install -g firebase-tools
> firebase login
> firebase init
	dist/petgree
> firebase deploy
> firebase open
	Hosting: Deployed Site

-----------------------------------------------------------------------------------------------

Docker:

$ ng build --prod

Dockerfile
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/petgree /usr/share/nginx/html


nginx.conf
events{}
http {
    include /etc/nginx/mime.types;
    server {
        listen 8080;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}


> docker build -t petgree .
> docker image ls
> docker run --name petgree-container -d -p 4200:8080 petgree
> docker container ls
> docker stop app-petgree
> docker rm petgree













