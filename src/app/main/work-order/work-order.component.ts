import {Component, OnInit, ViewChild} from '@angular/core';

import {OverlayModule} from '@angular/cdk/overlay';
import {Overlay, OverlayConfig, OverlayRef} 
from '@angular/cdk/overlay';
import {ComponentPortal} from  '@angular/cdk/portal';
import{PaymentOverlayComponent} from '../components/payment-overlay/payment-overlay.component';

import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from '../globalConstants';
import { LocalStorageService } from 'ngx-webstorage';
import { TenderAssocs } from '../tender/tenderAssoc';
import { Leads } from '../lead';
import { TenderItems } from '../tender/tenderItems';
import { KeyDeliverables } from '../components/keydeliverables/keyDeliverables';
import { TermsConditions } from '../components/termsandconditions/termsConditions';
import { WorkSchedules } from './workSchedules';
import { PaySchedules } from './paySchedules';

interface TenderData {
  lineitem: string,
  comments: string,
  quantity: string,
  rate: string,
  itemamount: string

}

@Component({
  selector: 'work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent {
  panelOpenState = true;
tenderAssocs:TenderAssocs[];
items: TenderItems[];
Total: number;
Total_Words : string;
a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
n ;
IssueDate : string;
WorkType : string;
custDetails :Leads[];
keys:KeyDeliverables[];
terms :TermsConditions[];
works :WorkSchedules[];
pays : PaySchedules[];
  constructor(private breakpointObserver: BreakpointObserver,private authService :AuthService,private storage:LocalStorageService,
    private activatedRoute : ActivatedRoute, private g :GlobalConstants, public overlay: Overlay) {}
  
  ngOnInit() {
    console.log('second tab');
    console.log('Work_ID' +this.g.Work_ID);
   console.log('Status'+this.g.Status);
   this.getTenderAssoc(this.g.Work_ID);
   this.getWorkOrderDetails();
   this.getCustomerDetails();
   this.getFinalTenderDetails();
   this.getKeys();
   this.getTerms();
   this.getWorkSchedule();
   this.getPaySchedule();
  }
 
  getTenderAssoc(id)
  {
this.authService.getSelectedTenderAssocs(id).subscribe(result=>{console.log(result);
  this.tenderAssocs=result;
})
  }
  getWorkOrderDetails()
  {
    this.authService.getWorkOrderDetails(this.g.Work_ID).subscribe(result=>{console.log(result);
      this.IssueDate=result[0];
      this.WorkType=result[1];
      this.Total=result[2];
      this.Total_Words=this.inWords(this.Total);
    })
  }
  getCustomerDetails()
  {
    this.authService.getCustDetails(this.g.Work_ID).subscribe(result=>{console.log(result);
      this.custDetails=result;
    })
  }
  getFinalTenderDetails()
  {
    this.authService.getFinalTenderDetails(this.g.Work_ID).subscribe(result=>{console.log(result);
      this.items=result;
    })
  }
  inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    this.n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!this.n) return; var str = '';
    str += (this.n[1] != 0) ? (this.a[Number(this.n[1])] || this.b[this.n[1][0]] + ' ' + this.a[this.n[1][1]]) + 'crore ' : '';
    str += (this.n[2] != 0) ? (this.a[Number(this.n[2])] || this.b[this.n[2][0]] + ' ' + this.a[this.n[2][1]]) + 'lakh ' : '';
    str += (this.n[3] != 0) ? (this.a[Number(this.n[3])] || this.b[this.n[3][0]] + ' ' + this.a[this.n[3][1]]) + 'thousand ' : '';
    str += (this.n[4] != 0) ? (this.a[Number(this.n[4])] || this.b[this.n[4][0]] + ' ' + this.a[this.n[4][1]]) + 'hundred ' : '';
    str += (this.n[5] != 0) ? ((str != '') ? 'and ' : '') + (this.a[Number(this.n[5])] || this.b[this.n[5][0]] + ' ' + this.a[this.n[5][1]]) + 'only ' : '';
    return str;
}
 getKeys()
 {
   this.authService.getWorkKeys(this.g.Work_ID).subscribe(result=>{console.log(result);
    this.keys=result;
  })
 }
 getTerms()
 {
  this.authService.getWorkTerms(this.g.Work_ID).subscribe(result=>{console.log(result);
    this.terms=result;
  })
 }
 getWorkSchedule()
 {
   this.authService.getWorkSchedule(this.g.Work_ID).subscribe(result=>{console.log(result);
    this.works=result;
  })
 }
 getPaySchedule()
 {
  this.authService.getPaySchedule(this.g.Work_ID).subscribe(result=>{console.log(result);
    this.pays=result;
  })
 }
}