import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  uid: string | null;

  constructor(private route: ActivatedRoute) {
    this.uid = null;
    if(this.route.snapshot != undefined)
      this.uid = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
  }

}
