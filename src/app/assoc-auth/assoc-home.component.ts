import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { GlobalConstants } from '../main/globalConstants';


@Component({
  selector: 'assoc-home',
  templateUrl: './assoc-home.component.html',
  styleUrls: ['./assoc-home.component.scss']
})
export class AssocHomeComponent {
  Assoc_ID : number;
  
  Work_ID : number;
  
  
  
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

constructor(private breakpointObserver: BreakpointObserver,private storage:LocalStorageService, 
  private router :Router, private g:GlobalConstants) {

  
 // this.workStorage.clear();
}
ngOnInit() {
 this.Assoc_ID=this.storage.retrieve('AssocID');
 this.Work_ID=this.g.Work_ID;
  
 
}
logout()
  {
this.storage.clear();
this.router.navigate(['**']);
  }
 
}
