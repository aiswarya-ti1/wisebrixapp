import {Component, OnInit, ViewChild} from '@angular/core';

import {OverlayModule} from '@angular/cdk/overlay';
import {Overlay, OverlayConfig, OverlayRef} 
from '@angular/cdk/overlay';
import {ComponentPortal} from  '@angular/cdk/portal';
import{PaymentOverlayComponent} from '../components/payment-overlay/payment-overlay.component';
import { TenderAssocs } from './tenderAssoc';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from '../globalConstants';
import { LocalStorageService } from 'ngx-webstorage';

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
tenderAssocs:TenderAssocs[];
  constructor(private breakpointObserver: BreakpointObserver,private authService :AuthService,private storage:LocalStorageService,
    private activatedRoute : ActivatedRoute, private g :GlobalConstants, public overlay: Overlay) {}
  
  ngOnInit() {
    console.log('second tab');
    console.log('Work_ID' +this.g.Work_ID);
    this.chkPaymentDone(this.g.Work_ID);
    this.getTenderAssoc(this.g.Work_ID);
  }
  chkPaymentDone(id)
  {
    this.authService.chkPaymentDone(id).subscribe(result=>{console.log(result);
      if(result==0)
      {
        let config = new OverlayConfig();
    config.hasBackdrop=true;
    config.positionStrategy = this.overlay.position()
        .global()
        .centerVertically().centerHorizontally();
    const overlayRef = this.overlay.create(config);
    const paymentOverlay = new ComponentPortal(PaymentOverlayComponent);
    overlayRef.attach(paymentOverlay);
    
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
      }
    })
  }
  getTenderAssoc(id)
  {
this.authService.getSelectedTenderAssocs(id).subscribe(result=>{console.log(result);
  this.tenderAssocs=result;
})
  }
  reqSiteVisit(assocID)
  {
   this.g.Assoc_ID=assocID;
    this.authService.updateReqSiteVisit(assocID,this.g.Work_ID).subscribe(result1=>{console.log(result1);
      this.getTenderAssoc(this.g.Work_ID);
    })
    this.authService.sendLetterOfIntrest(assocID).subscribe(result=>{console.log(result);
      if(result['Success']==true)
      {
        alert('Mail Send Successfully!!');
      }
    })
  }
  confirmAssoc(tID)
  {
    this.authService.confirmAssoc(tID).subscribe(result=>{console.log(result);
      this.getTenderAssoc(this.g.Work_ID);
    })
  }
  rejectAssoc(tID)
  {
    this.authService.rejectAssoc(tID).subscribe(result=>{console.log(result);
      this.getTenderAssoc(this.g.Work_ID); 
    })
  }
}