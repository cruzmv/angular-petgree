import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Cats } from 'src/app/models/cats';
import { CatDialogComponent } from '../cat-dialog/cat-dialog.component';
import { FileUpload, FirebaseDbServiceService } from 'src/app/services/firebase-db-service.service';
import { CatPropertieDialogComponent } from 'src/app/cats/cat-propertie-dialog/cat-propertie-dialog.component';
import { finalize } from 'rxjs/operators';
import { ContactDialogComponent } from 'src/app/contacts/contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent implements OnInit {
  cat: Cats = {uid: '', name: 'New Cat', pedgree:'' };
  frmGroup = new FormGroup({
    uid: new FormControl(),
    name: new FormControl(),
    pedgree: new FormControl(),
    date_birth: new FormControl(),
    date_arrivel: new FormControl(),
    color: new FormControl(),
    part_color: new FormControl(),
    patter: new FormControl(),
    race: new FormControl(),
    sex: new FormControl(),
    eyes: new FormControl(),
    cattery: new FormControl(),
    country: new FormControl(),
    breeder: new FormControl(),
    marks: new FormControl(),
    father: new FormControl(),
    father_race: new FormControl(),
    mother: new FormControl(),
    mother_race: new FormControl(),
    obs: new FormControl(),
    proprietary: new FormControl(),
    creator: new FormControl(),
    microship: new FormControl(),
    imageUrl: new FormControl()
  });

  panelOpenState = false;
  userStorage: any = localStorage.getItem('user.uid');
  fileImageUrl = 'assets/img/catshadow.jpg';
  percentageUpload: any;

  constructor(private activeRouter: ActivatedRoute,
              private db: FirebaseDbServiceService,
              private route: Router,
              public catDialog: MatDialog,
              public catPropertieDialog: MatDialog) { }

  ngOnInit(): void {
    if(this.activeRouter.params){
      this.activeRouter.params.subscribe(par => {
        if(par.id){
          this.db.getCat(par.id).subscribe((res:any) => {
            if(res.name)
              this.cat = res;
              if(res.imageUrl)
                this.fileImageUrl = res.imageUrl;

            this.frmGroup = new FormGroup({
              uid: new FormControl(res.uid, [Validators.required]),
              name: new FormControl(res.name ? res.name : 'New cat', [Validators.required]),
              pedgree: new FormControl(res.pedgree),
              date_birth: new FormControl(  this.cat.date_birth? new Date(this.cat.date_birth?.seconds * 1000): ''  ),
              date_arrivel: new FormControl(  this.cat.date_arrivel? new Date(this.cat.date_arrivel?.seconds * 1000): ''  ),
              color: new FormControl(res.color),
              part_color: new FormControl(res.part_color),
              patter: new FormControl(res.patter),
              race: new FormControl(res.race),
              sex: new FormControl(res.sex),
              eyes: new FormControl(res.eyes),
              cattery: new FormControl(res.cattery),
              country: new FormControl(res.country),
              breeder: new FormControl(res.breeder),
              marks: new FormControl(res.marks),
              father: new FormControl(res.father?.name),
              father_race: new FormControl(res.father?.race),
              mother: new FormControl(res.mother?.name),
              mother_race: new FormControl(res.mother?.race),
              obs: new FormControl(res.obs),
              proprietary: new FormControl(res.proprietary),
              creator: new FormControl(res.creator),
              microship: new FormControl(res.microship),
              imageUrl: new FormControl(res.imageUrl)
            })
          })
        }

      })
    }
  }

  search_parent(parent:string){
    const catDialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    //catDialogConfig.disableClose = true;
    catDialogConfig.id = "modal-component";
    catDialogConfig.height = "80%";
    catDialogConfig.width = "100%";
    const modalDialog = this.catDialog.open(CatDialogComponent, catDialogConfig);
    modalDialog.afterClosed().subscribe(() => {
      const result = modalDialog.componentInstance.result;

      if(parent==="father"){
        this.frmGroup.patchValue({
          father: result.name,
          father_race: result.race
        });
      } else {
        this.frmGroup.patchValue({
          mother: result.name,
          mother_race: result.race
        });
      }

    });

  }

  search_propertie(prop:string){
    const catDialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    //catDialogConfig.disableClose = true;
    catDialogConfig.id = "modal-component";
    catDialogConfig.height = "80%";
    catDialogConfig.width = "100%";
    catDialogConfig.data = {prop: prop};
    const modalDialog = this.catPropertieDialog.open(CatPropertieDialogComponent, catDialogConfig);
    modalDialog.afterClosed().subscribe(()=>{
      const result = modalDialog.componentInstance.result;
      if(result)
        this.frmGroup.patchValue({
          [prop]: result.name,
        });
    })

  }

  search_contact(ctoKind:any){
    const contactDialogConfig = new MatDialogConfig();
    contactDialogConfig.id = "modal-component";
    contactDialogConfig.height = "80%";
    contactDialogConfig.width = "100%";
    contactDialogConfig.data = {ctoKind: ctoKind};
    const modalDialog = this.catDialog.open(ContactDialogComponent, contactDialogConfig);
    if(ctoKind)
      modalDialog.afterClosed().subscribe(() => {
        const result = modalDialog.componentInstance.result
        if(result)
          this.frmGroup.patchValue({
            [ctoKind]: result.name,
          })
      })
  }

  saveCat(form:any){
    this.cat.name = form.name;
    this.cat.pedgree = form.pedgree;
    this.cat.date_birth = form.date_birth;
    this.cat.date_arrivel = form.date_arrivel;
    this.cat.color = form.color;
    this.cat.part_color = form.part_color;
    this.cat.patter = form.patter;
    this.cat.race = form.race;
    this.cat.sex = form.sex;

    this.cat.eyes = form.eyes;
    this.cat.cattery = form.cattery;
    this.cat.country = form.country;
    this.cat.breeder = form.breeder;
    this.cat.marks = form.marks;
    this.cat.father = form.father;
    if(this.cat.father && this.cat.father.race)
      this.cat.father.race = form.father_race;

    this.cat.mother = form.mother;

    if(this.cat.mother?.race)
      this.cat.mother.race = form.mother_race;

    this.cat.obs = form.obs;
    this.cat.proprietary = form.proprietary;
    this.cat.creator = form.creator;
    this.cat.microship = form.microship;
    this.cat.imageUrl = this.fileImageUrl;

    this.db.updateCat(this.cat);
    this.route.navigate(['/dashboard']);
  }

  addAttachment(event:any){
    const file = event.target.files[0];
    const fileUpload = new FileUpload(file);
    const pushFile =  this.db.pushFileToStorage(fileUpload);

    pushFile.percentageChanges().subscribe(res => {
      this.percentageUpload = res;
    });
    pushFile.then(res => {
      this.db.storageRef.getDownloadURL().subscribe((url:any) => {
        this.fileImageUrl = url;
        this.percentageUpload = 0;
      })
    })

  }

  changeImage(){
    const btnImage = document.getElementById('btnImage');
    btnImage?.click();
  }


}
