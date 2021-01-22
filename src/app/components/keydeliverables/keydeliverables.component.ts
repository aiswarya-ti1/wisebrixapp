import { Component, OnInit } from '@angular/core';
import { KeyDeliverables } from './keyDeliverables';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/customer/auth.service';
import { GlobalConstants } from 'src/app/customer/cust-main/globalConstants';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-keydeliverables',
  templateUrl: './keydeliverables.component.html',
  styleUrls: ['./keydeliverables.component.scss']
})
export class KeydeliverablesComponent implements OnInit {
  
  keys : KeyDeliverables[];
   Work_ID : number;

  constructor(private breakpointObserver: BreakpointObserver,private authService :AuthService,
    private activatedRoute : ActivatedRoute, private g :GlobalConstants, public snackBar:MatSnackBar) { }

  ngOnInit() {
    this.Work_ID=this.g.Work_ID;
    this.getKeyDeliverables(this.Work_ID);
    
  }

  //API to get Key deliverables.
  getKeyDeliverables(id)
  {
    this.authService.getWorkKeys(id).subscribe(result=>{console.log(result);
      this.keys=result;
    }),(error=>{console.log(error);
      this.openSnackBar(error.error.error,'OK');})
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
