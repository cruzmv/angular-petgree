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
