import { TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
//import { Observable, of } from 'rxjs';
//import { Contact } from '../models/contact';

import { FirebaseDbServiceService } from './firebase-db-service.service';
/*
const input: Contact[][] = [[
  { uid: 'aaa', id: '0', name: 'Polska'},
  { uid: 'bbb', id: '2', name: 'Polka'}
]];

const data = Observable.arguments(input);
const collectionStub = {
  valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
}
const angularFiresotreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
}
*/
//let mockOwnerService: any;
/*
class AngularFirestoreMock extends AngularFirestore {
  public collection<TObject>(name: string, queryFn?: QueryFn): AngularFirestoreCollection<TObject> {
    const ref = this.firestore.collection('tobjects');
    if (!queryFn) { queryFn = (ref) => ref; }
    return new AngularFirestoreCollection<TObject>(ref, queryFn(ref));
  }
}
*/

describe('FirebaseDbServiceService', () => {
  let service: FirebaseDbServiceService;

  beforeEach( waitForAsync( () => {
    // mockOwnerService = jasmine.createSpyObj('firebaseDbServiceService', ['getContact', 'fetchOwners']);
    // mockOwnerService.createOwner.and.returnValue(Promise.resolve(true)); // up to you how you want to mock
    // mockOwnerService.fetchOwners.and.returnValue(of([])); // up to you how you want to mock
    // const testQuote = 'Test Quote';
    // const twainService = jasmine.createSpyObj('TwainService', ['getQuote']);
    // const getQuoteSpy = twainService.getQuote.and.returnValue(of(testQuote));

    TestBed.configureTestingModule({
      providers:[
        {provide: AngularFirestore, useValue: {}  },
        {provide: AngularFireDatabase, useValue: {}  },
        {provide: AngularFireStorage, useValue: {}  }
      ]
    });
    service = TestBed.inject(FirebaseDbServiceService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
