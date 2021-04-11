import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ContactsModule } from './contacts/contacts.module';

import { FirebaseAuthServiceService } from './services/firebase-auth-service.service';
import { FirebaseDbServiceService } from './services/firebase-db-service.service';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { CatsModule } from './cats/cats.module';
import { CatComponent } from './cats/cat/cat.component';

import { CatsListComponent } from './cats/cats-list/cats-list.component';
import { CatDialogComponent } from './cats/cat-dialog/cat-dialog.component';
import { CatPropertieDialogComponent } from './cats/cat-propertie-dialog/cat-propertie-dialog.component';
import { ContactsListComponent } from './contacts/contactsList/contacts-list.component';
import { ContactDialogComponent } from './contacts/contact-dialog/contact-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    CatsListComponent,
    CatDialogComponent,
    CatPropertieDialogComponent,
    ContactsListComponent,
    ContactDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatMenuModule,
    MatDialogModule,
    
    ContactsModule,
    CatsModule,
    
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    FirebaseAuthServiceService, FirebaseDbServiceService,CatComponent,
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: CatDialogComponent,
      useValue: {},
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
