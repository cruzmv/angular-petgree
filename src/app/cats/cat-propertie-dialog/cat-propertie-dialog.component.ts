import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CatPropertie } from 'src/app/models/cats';
import { FirebaseDbServiceService } from 'src/app/services/firebase-db-service.service';

@Component({
  selector: 'app-cat-propertie-dialog',
  templateUrl: './cat-propertie-dialog.component.html',
  styleUrls: ['./cat-propertie-dialog.component.css']
})
export class CatPropertieDialogComponent implements AfterViewInit {
  catProp: Array<CatPropertie> = [];
  propData: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['name', 'code','opc'];
  edit: boolean = false;
  result: any;
  frmGroup = new FormGroup({
    uid: new FormControl(),
    name: new FormControl(),
    code: new FormControl()
  });
  translateProp = (prop:string) =>{
    switch (prop) {
      case 'color':
        return {title: 'Color'}
        break;
      case 'marks':
        return {title: 'Marks'}
        break;
      case 'part_color':
        return {title: 'Part Color'}
        break;
      case 'patter':
        return {title: 'Patter'}
        break;
      case 'sex':
        return {title: 'Sex'}
        break;
      case 'eyes':
        return {title: 'Eyes'}
        break;
      case 'breeder':
        return {title: 'Breeder'}
        break;
      case 'country':
        return {title: 'Country'}
        break;
      default:
        return {title: ''}
        break;
    }
  }  


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
    
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
             private db: FirebaseDbServiceService,
             public dialogRef: MatDialogRef<CatPropertieDialogComponent> ) {
    
    this.db.listCatPropertie(data.prop).subscribe(res => {
      this.propData = new MatTableDataSource(res);
      this.propData.paginator = this.paginator;
      this.propData.sort = this.sort;    
    })
  }

  ngAfterViewInit() {}

  newProp(){
    this.frmGroup.patchValue({
      uid: null,
      name: '',
      code: '',
    })
  }

  editprop(prop:any){
    this.frmGroup.patchValue({
      uid: prop.uid,
      name: prop.name,
      code: prop.code,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.propData.filter = filterValue.trim().toLowerCase();
    if (this.propData.paginator) {
      this.propData.paginator.firstPage();
    }
  }  

  deleteProp(row:any){
    this.db.deleteCatPropertie(row.uid,this.data.prop);
  }

  saveProp(row:CatPropertie){
    this.db.saveCatPropertie(row,this.data.prop);
    this.edit = false;
  }

  selectProp(row:CatPropertie){
    this.result = row;
    this.dialogRef.close()
  }
  
}
