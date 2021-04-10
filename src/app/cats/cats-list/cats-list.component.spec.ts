import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FirebaseDbServiceService } from 'src/app/services/firebase-db-service.service';
import { firebaseMock } from '../../models/firebaseMock';
import { CatDialogComponent } from '../cat-dialog/cat-dialog.component';
import { CatsListComponent } from './cats-list.component';



describe('CatsListComponent', () => {
  let component: CatsListComponent;
  let fixture: ComponentFixture<CatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatsListComponent ],
      providers: [
        {provide: FirebaseDbServiceService, useClass: firebaseMock },
        {provide: Router, useValue: {}},
        {provide: CatDialogComponent, useValue: {}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
