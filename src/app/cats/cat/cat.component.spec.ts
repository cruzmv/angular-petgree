import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseAuthServiceService } from 'src/app/services/firebase-auth-service.service';
import { FirebaseDbServiceService } from 'src/app/services/firebase-db-service.service';

import { CatComponent } from './cat.component';

describe('CatComponent', () => {
  let component: CatComponent;
  let fixture: ComponentFixture<CatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: {} },
        {provide: FirebaseDbServiceService, useValue: {} },
        {provide: Router, useValue: {} },
        {provide: MatDialog, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
