import { Component, OnInit } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/customer/auth.service';
import { GlobalConstants } from 'src/app/customer/cust-main/globalConstants';
import { MatSnackBar } from '@angular/material';

import { PaySchedules } from 'src/app/customer/cust-main/work-order/paySchedules';

@Component({
  selector: 'pay-schedule',
  templateUrl: './pay-schedule.component.html',
  styleUrls: ['./pay-schedule.component.scss']
})
export class PaymentScheduleComponent implements OnInit {
  
  
   Work_ID : number;
   pays :PaySchedules[];

  constructor(private breakpointObserver: BreakpointObserver,private authService :AuthService,
    private activatedRoute : ActivatedRoute, private g :GlobalConstants, public snackBar:MatSnackBar) { }

  ngOnInit() {
    this.Work_ID=this.g.Work_ID;
    this.getPaySchedule();
    
  }

  //API to get Work Schedule.
  getPaySchedule()
  {
   this.authService.getPaySchedule(this.g.Work_ID).subscribe(result=>{console.log(result);
     this.pays=result;
   })
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
