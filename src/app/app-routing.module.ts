import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pipe } from 'rxjs';
import { AngularFireAuthGuard, customClaims } from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ContactsListComponent } from './contacts/contactsList/contacts-list.component';
import { ContactComponent } from './contacts/contact/contact.component';
import { CatComponent } from './cats/cat/cat.component';
import { PedigreeComponent } from './cats/pedigree/pedigree.component';

const redirectLoggedInToDashboard = () => 
  pipe(
    customClaims,
    map(claims => {
      // if no claims, then there is no authenticated user
      // so alow the route ['']
      if (claims.length === 0) {
        return ['login']
      } else {
        return true;
        //return ['dashboard', claims.user_id]
      }

      // otherwise, redirect user's profile page
      //return ['dashboard', claims.user_id]
    })
  )


const routes: Routes = [
  {
     path:'', redirectTo: '/dashboard',
     pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard }
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'cat/:id', component: CatComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard }
  },
  {
    path: 'contacts', component: ContactsListComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard }
  },
  {
    path: 'contact/:id', component: ContactComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard }
  },
  {
    path: 'pedigree/:id', component: PedigreeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
