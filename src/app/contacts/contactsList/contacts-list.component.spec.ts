import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { firebaseMock } from 'src/app/models/firebaseMock';
import { FirebaseDbServiceService } from 'src/app/services/firebase-db-service.service';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';
import { ContactComponent } from '../contact/contact.component';

import { ContactsListComponent } from './contacts-list.component';


describe('ContactsListComponent', () => {
  let component: ContactsListComponent;
  let fixture: ComponentFixture<ContactsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsListComponent ],
      providers: [
        {provide: FirebaseDbServiceService, useClass: firebaseMock },
        {provide: Router, useValue: {}},
        {provide: ContactDialogComponent, useValue: {}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
