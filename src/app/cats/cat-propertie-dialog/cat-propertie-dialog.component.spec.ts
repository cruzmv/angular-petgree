import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firebaseMock } from 'src/app/models/firebaseMock';
import { FirebaseDbServiceService } from 'src/app/services/firebase-db-service.service';

import { CatPropertieDialogComponent } from './cat-propertie-dialog.component';

describe('CatPropertieDialogComponent', () => {
  let component: CatPropertieDialogComponent;
  let fixture: ComponentFixture<CatPropertieDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatPropertieDialogComponent ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: FirebaseDbServiceService, useClass: firebaseMock },
        {provide: CatPropertieDialogComponent, useValue: {} },
        {provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatPropertieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
