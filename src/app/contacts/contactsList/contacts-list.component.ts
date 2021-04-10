import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { FirebaseDbServiceService } from 'src/app/services/firebase-db-service.service';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';
import { ContactsModule } from '../contacts.module';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements AfterViewInit {
  contacts: MatTableDataSource<Contact> = new MatTableDataSource<Contact>();
  displayedColumns: string[] = ['name', 'city','opc'];
  editContactUid: string | undefined = undefined;
  frmGroup = new FormGroup({
    uid: new FormControl(),
    name: new FormControl(),
    city: new FormControl(),
    contact: new FormControl(),
    cattery: new FormControl()
  });

  @Input('ctoKind')
  ctoKind: any;
    
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
    
  constructor(public fdb: FirebaseDbServiceService,
              private route: Router,
              private contactDialog: ContactDialogComponent) {    
    this.fdb.listContact().subscribe((res:any) => {

      this.contacts = new MatTableDataSource(res);
      this.contacts.paginator = this.paginator;
      this.contacts.sort = this.sort;
    })            
  }

  applyFilter(event:any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.contacts.filter = filterValue.trim().toLowerCase();
    if (this.contacts.paginator) {
      this.contacts.paginator.firstPage();
    }
  }

  selectContact(cto:any){
    if(this.ctoKind){
      this.contactDialog.result = cto;
      this.contactDialog.closeDialog();
    }
  }

  editContact(uid:string){
    this.editContactUid=uid;
    if(uid){
      this.fdb.getContact(uid).subscribe(res => {
        this.frmGroup = new FormGroup({
          uid: new FormControl(res.uid),
          name: new FormControl(res.name),
          city: new FormControl(res.city),
          contact: new FormControl(res.contact),
          cattery: new FormControl(res.cattery)
        });      
      })  
    } else {
      this.frmGroup = new FormGroup({
        uid: new FormControl(),
        name: new FormControl(),
        city: new FormControl(),
        contact: new FormControl(),
        cattery: new FormControl()
      });      
    }
  }

  saveContact(form:any){
    const contact: Contact = {
      uid: form.uid,
      name: form.name,
      city: form.city,
      contact: form.contact,
      cattery: form.cattery
    }

    this.fdb.updateContact(contact);
    this.editContactUid = undefined;
  }

  deleteContact(uid:string){
    this.fdb.deleteContact(uid);
  }

  ngAfterViewInit() { }



/*
  editContact(uid:string){
    this.route.navigate(['/contact',uid])
  }

  delContact(uid:string){
    this.fdb.deleteContact(uid)
  }
*/  


}
