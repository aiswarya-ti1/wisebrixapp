import { Component, OnInit } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/customer/auth.service';
import { GlobalConstants } from 'src/app/customer/cust-main/globalConstants';
import { MatSnackBar } from '@angular/material';
import { WorkSchedules } from 'src/app/customer/cust-main/work-order/workSchedules';

@Component({
  selector: 'work-schedule',
  templateUrl: './work-schedule.component.html',
  styleUrls: ['./work-schedule.component.scss']
})
export class WorkScheduleComponent implements OnInit {
  
  
   Work_ID : number;
   works :WorkSchedules[];

  constructor(private breakpointObserver: BreakpointObserver,private authService :AuthService,
    private activatedRoute : ActivatedRoute, private g :GlobalConstants, public snackBar:MatSnackBar) { }

  ngOnInit() {
    this.Work_ID=this.g.Work_ID;
    this.getWorkSchedule();
    
  }

  //API to get Work Schedule.
  getWorkSchedule()
 {
   this.authService.getWorkSchedule(this.g.Work_ID).subscribe(result=>{console.log(result);
    this.works=result;
  })
 }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
