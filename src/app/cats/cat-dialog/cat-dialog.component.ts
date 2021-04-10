import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cat-dialog',
  templateUrl: './cat-dialog.component.html',
  styleUrls: ['./cat-dialog.component.css']
})
export class CatDialogComponent implements OnInit {

  result: any;
  constructor(public dialogRef: MatDialogRef<CatDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
