import { Component, OnInit } from '@angular/core';
import { FirebaseAuthServiceService } from '../services/firebase-auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: FirebaseAuthServiceService) { }

  ngOnInit(): void {
  }

}
