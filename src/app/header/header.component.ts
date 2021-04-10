import { Component, OnInit } from '@angular/core';
import { FirebaseAuthServiceService } from '../services/firebase-auth-service.service';
import { CatComponent } from '../cats/cat/cat.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public fbas: FirebaseAuthServiceService,
              private contact: CatComponent) { }

  ngOnInit(): void {
  }

  contacts(){
    this.contact.search_contact('');
  }

}
