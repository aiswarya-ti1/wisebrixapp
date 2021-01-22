import {Component, OnInit, ViewChild} from '@angular/core';

import {OverlayModule} from '@angular/cdk/overlay';
import {Overlay, OverlayConfig, OverlayRef} 
from '@angular/cdk/overlay';
import {ComponentPortal} from  '@angular/cdk/portal';

import { TenderAssocs } from './tenderAssoc';
import { BreakpointObserver } from '@angular/cdk/layout';

import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from '../globalConstants';
import { LocalStorageService } from 'ngx-webstorage';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PaymentOverlayComponent } from 'src/app/components/payment-overlay/payment-overlay.component';
import { AuthService } from '../../auth.service';

interface TenderData {
  lineitem: string,
  comments: string,
  quantity: string,
  rate: string,
  itemamount: string
  

}

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.css']
})
export class TenderComponent {
  panelOpenState = true;
  reason=1;
  Rating:number=3;
  paymentFlag:number;
tenderAssocs:TenderAssocs[];
StatusName:string;
  constructor(private breakpointObserver: BreakpointObserver,private authService :AuthService,private storage:LocalStorageService,
    private activatedRoute : ActivatedRoute, private g :GlobalConstants, public overlay: Overlay,
    public dialog: MatDialog, public snackBar :MatSnackBar) {}
  
  ngOnInit() {
    console.log('second tab');
    console.log('Work_ID' +this.g.Work_ID);
    this.chkPaymentDone(this.g.Work_ID);
    this.getTenderAssoc(this.g.Work_ID);
    this.getStatusNames(this.g.Work_ID);
  }

  //To confirm payment done or not
  chkPaymentDone(id)
  {
    this.authService.chkPaymentDone(id).subscribe(result=>{console.log(result);
      this.paymentFlag=result;
      console.log(this.paymentFlag);
     // this.g.paymentStatus=this.paymentFlag;
      if(result==0)
      {
        /*let config = new OverlayConfig();
    config.hasBackdrop=true;
    config.disposeOnNavigation=true;
    
    config.positionStrategy = this.overlay.position()
        .global()
        .centerVertically().centerHorizontally();
    const overlayRef = this.overlay.create(config);
    const paymentOverlay = new ComponentPortal(PaymentOverlayComponent);
    overlayRef.attach(paymentOverlay);
    
    
    
    
    overlayRef.backdropClick().subscribe(() => {
      
      overlayRef.detach();
      
      this.chkPaymentDone(this.g.Work_ID);
    });*/

    this.dialog.open(PaymentOverlayComponent, {
      data: {
       
      }
    });
    this.dialog.afterAllClosed.subscribe(result => {
      console.log('The dialog was closed');
      this.chkPaymentDone(this.g.Work_ID);
      this.getTenderAssoc(this.g.Work_ID);
    });
      }
      
     
    })
  }
  //To get all Associate details who submitted tenders
  getTenderAssoc(id)
  {
this.authService.getSelectedTenderAssocs(id).subscribe(result=>{console.log(result);
  this.tenderAssocs=result;
})
  }

  //If customer request a site visit
  reqSiteVisit(assocID)
  {
   this.g.Assoc_ID=assocID;
    this.authService.updateReqSiteVisit(assocID,this.g.Work_ID).subscribe(result1=>{console.log(result1);
      this.getTenderAssoc(this.g.Work_ID);
    })
    this.authService.sendLetterOfIntrest(assocID).subscribe(result=>{console.log(result);
      if(result['Success']==true)
      {
        this.openSnackBar('Mail Send Successfully!!', "OK");
      }
    })
  }
  //If a customer confirms a tender
  confirmAssoc(tID)
  {
    this.authService.confirmAssoc(tID).subscribe(result=>{console.log(result);
      if(result['Success']==true)
      {
        this.getTenderAssoc(this.g.Work_ID);
        this.getStatusNames(this.g.Work_ID);
      }
      
    })
  }
  //If a customer Rejects a tender
  rejectAssoc(tID)
  {
    
    this.authService.rejectAssoc(tID, this.reason).subscribe(result=>{console.log(result);
      this.getTenderAssoc(this.g.Work_ID); 
    })
  }
  //To get Customer statuses from Work order generation
  getStatusNames(tid)
  {
    this.authService.getStatusNames(tid).subscribe(result=>{console.log(result);
this.StatusName=result[0]['Cust_Status_Name'];
    })
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}