import { Component, OnInit } from '@angular/core';
import { TermsConditions } from './termsConditions';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/auth/auth.service';
import { GlobalConstants } from '../../globalConstants';

@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.component.html',
  styleUrls: ['./termsandconditions.component.scss']
})
export class TermsandconditionsComponent implements OnInit {Work_ID : number;
  terms : TermsConditions[];

  constructor(private breakpointObserver: BreakpointObserver,private authService :AuthService,
     private g :GlobalConstants) { }

  ngOnInit() {
    this.Work_ID=this.g.Work_ID;
    this.getTerms(this.Work_ID);
    
  }
  getTerms(id)
  {
    this.authService.getWorkTerms(id).subscribe(result=>{console.log(result);
      this.terms=result;
    })
  }
}
