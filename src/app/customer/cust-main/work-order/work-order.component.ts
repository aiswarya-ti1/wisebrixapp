import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';

import {OverlayModule} from '@angular/cdk/overlay';
import {Overlay, OverlayConfig, OverlayRef} 
from '@angular/cdk/overlay';
import {ComponentPortal} from  '@angular/cdk/portal';

import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from '../globalConstants';
import { LocalStorageService } from 'ngx-webstorage';
import { TenderAssocs } from '../tender/tenderAssoc';
import { Leads } from '../lead';
import { TenderItems } from '../tender/tenderItems';

import { WorkSchedules } from './workSchedules';
import { PaySchedules } from './paySchedules';
import { AuthService } from '../../auth.service';
import { KeyDeliverables } from 'src/app/components/keydeliverables/keyDeliverables';
import { TermsConditions } from 'src/app/components/termsandconditions/termsConditions';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { PaymentOverlayComponent } from 'src/app/components/payment-overlay/payment-overlay.component';

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
assocAddressAlign:string;
custAddressAlign:string;
WOSigned_Flag : number;

private mediaSub: Subscription;
  constructor(private breakpointObserver: BreakpointObserver,private authService :AuthService,private storage:LocalStorageService,
    private activatedRoute : ActivatedRoute, private g :GlobalConstants, public overlay: Overlay,
    private cdRef: ChangeDetectorRef,
    private mediaObserver: MediaObserver) {}
  
  ngOnInit() {
    /*Logic to dynamically alter fxLayoutAlign for customer and associate address based on 
    media values : Start*/
    this.assocAddressAlign='end end';
    this.custAddressAlign='start start';
    console.log("assocAddressAlign 1:: "+this.assocAddressAlign);
    console.log("custcAddressAlign 1:: "+this.custAddressAlign);
    /*Detect media size: Start*/ 
    this.mediaSub=this.mediaObserver.media$.subscribe(
      (change:MediaChange)=>{
        console.log("mqAlias: "+change.mqAlias);
        console.log("mediaqueries : "+change)
        if(change.mqAlias=='xs'){
          console.log("inside if");
          this.assocAddressAlign="center center";
          this.custAddressAlign="center center";
        }
        console.log("assocAddressAlign 2:: "+this.assocAddressAlign);
        console.log("custcAddressAlign 2:: "+this.custAddressAlign);
        
      }
      /*Logic to dynamically alter fxLayoutAlign for customer and associate address based on 
    media values : End*/
    )

        /*Detect media size: End*/ 


    console.log('second tab');
    console.log('Work_ID' +this.g.Work_ID);
   console.log('Status'+this.g.Status);
   this.getFinalTenderAssoc(this.g.Work_ID);
   this.getWorkOrderDetails();
   this.getCustomerDetails();
   this.getFinalTender(this.g.Work_ID);
   this.chkWOSigned();
   this.getKeys();
   this.getTerms();
  
  
  }
  getFinalTender($id)
      {
        this.authService.getFinalTender($id).subscribe(result=>{console.log(result);
        this.items=result;
        this.Total=result[0]['TotalQuote'];
        this.Total_Words=this.inWords(this.Total);})

      }
 
  getFinalTenderAssoc(id)
  {
this.authService.getFinalTenderAssoc(id).subscribe(result=>{console.log(result);
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
 
 
 chkWOSigned()
 {
   this.authService.chkWOSigned(this.g.Work_ID).subscribe(result=>{console.log(result);
    if(result==1)
    {
      this.WOSigned_Flag=1;
    }
    else{
      this.WOSigned_Flag=0;
    }
    
  })
 }
 woSigned()
 {
   this.authService.woSigned(this.g.Work_ID).subscribe(result=>{console.log(result);
    if(result['Success']==true)
    {
      this.WOSigned_Flag=1;
    }
  })
 }
}