import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { Cats } from 'src/app/models/cats';
import { CatDialogComponent } from '../cat-dialog/cat-dialog.component';

import { FirebaseDbServiceService } from 'src/app/services/firebase-db-service.service';

@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.css']
})

export class CatsListComponent implements AfterViewInit {
  displayedColumns: string[] = ['pedgree','name', 'color','race','sex','opc'];
  cats: MatTableDataSource<Cats> = new MatTableDataSource<Cats>();

  @Input('init')
  dialog: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private fdb: FirebaseDbServiceService,
              private route: Router,
              private catDialog: CatDialogComponent) {
    this.fdb.listCats().subscribe( (res:any) => {
      res.forEach((cat:any) => {
        cat.date_birth = cat.date_birth? new Date(cat.date_birth?.seconds * 1000) : '';
        cat.date_arrivel = cat.date_arrivel? new Date(cat.date_arrivel?.seconds * 1000) : '';
        cat.opc = true;
      });
      this.cats = new MatTableDataSource(res);
      this.cats.paginator = this.paginator;
      this.cats.sort = this.sort;
    })    
  }

  ngAfterViewInit() { 
    //console.log(this.dialog);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.cats.filter = filterValue.trim().toLowerCase();
    if (this.cats.paginator) {
      this.cats.paginator.firstPage();
    }
  }

  cat(uid:string){
    this.route.navigate(['/cat',uid])
  }

  delete(uid:string){
    this.fdb.deleteCat(uid);
  }

  selectCat(cat:Cats){
    if(!this.dialog)
      return true;

    this.catDialog.result = cat;
    this.catDialog.closeDialog();

    return true;
  }

}