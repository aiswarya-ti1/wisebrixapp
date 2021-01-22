import { Component, OnInit } from '@angular/core';
import { TermsConditions } from './termsConditions';
import { BreakpointObserver } from '@angular/cdk/layout';

import { AuthService } from 'src/app/customer/auth.service';
import { GlobalConstants } from 'src/app/customer/cust-main/globalConstants';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.component.html',
  styleUrls: ['./termsandconditions.component.scss']
})
export class TermsandconditionsComponent implements OnInit {Work_ID : number;
  terms : TermsConditions[];

  constructor(private breakpointObserver: BreakpointObserver,private authService :AuthService, public snackBar:MatSnackBar,
     private g :GlobalConstants) { }

  ngOnInit() {
    this.Work_ID=this.g.Work_ID;
    this.getTerms(this.Work_ID);
    
  }

  //To get Terms & Conditions
  getTerms(id)
  {
    this.authService.getWorkTerms(id).subscribe(result=>{console.log(result);
      this.terms=result;
    })
    ,(error=>{console.log(error);
      this.openSnackBar(error.error.error,'OK');})
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
