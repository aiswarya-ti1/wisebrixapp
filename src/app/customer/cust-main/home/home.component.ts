import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';


import { GlobalConstants } from '../globalConstants';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  Cust_ID : number;
  CustName :string;
  Work_ID : number=0;
  
  
  
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

constructor(private breakpointObserver: BreakpointObserver,private storage:LocalStorageService, 
  private g : GlobalConstants,
  private router :Router) {

  
 // this.workStorage.clear();
}

ngOnInit() {
this.g.Work_ID=0;
this.g.index=1;
  this.Cust_ID=this.storage.retrieve('CustID');
  this.CustName=this.storage.retrieve('CustName');
  this.Work_ID=this.g.Work_ID;
  this.g.paymentStatus=0;
  
  
}
logout()
  {
this.storage.clear();
this.router.navigate(['login']);
  }
 
}
