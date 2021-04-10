import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { FirebaseDbServiceService } from 'src/app/services/firebase-db-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact: Contact = {
    uid: '', 
    name: ''
  };

   frmGroup = new FormGroup({
    uid: new FormControl(),
    id: new FormControl(),
    name: new FormControl(),
    cattery: new FormControl(),
    cattery_register: new FormControl(),
    birth_date: new FormControl(),
    contact: new FormControl(),
   });

  constructor(private activeRouter: ActivatedRoute,
              public db: FirebaseDbServiceService,
              private router: Router) {}

  updateContact(contact:Contact){
      this.db.updateContact(contact);
      this.router.navigate(['/contacts']);
  }

  ngOnInit(): void { 

    if(this.activeRouter.params){
      this.activeRouter.params.subscribe(param => {

        if(param.id){

          this.db.getContact(param.id).subscribe((res:any)=> {
            this.contact = res;
            this.frmGroup = new FormGroup({
              uid: new FormControl(this.contact.uid, [Validators.required]), 
              name: new FormControl(this.contact.name, [Validators.required]),
              cattery: new FormControl(this.contact.cattery),
              cattery_register: new FormControl(this.contact.cattery_register),
              birth_date: new FormControl(  this.contact.birth_date? new Date(this.contact.birth_date?.seconds * 1000): ''  ),
              contact: new FormControl(this.contact.contact)
            });
          })
  
        }

      })
    }


  }

}
