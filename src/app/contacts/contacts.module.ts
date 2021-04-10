import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { ContactComponent } from './contact/contact.component';
import { MatNativeDateModule } from '@angular/material/core';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,

    BrowserModule,
    AppRoutingModule,

    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class ContactsModule { }
