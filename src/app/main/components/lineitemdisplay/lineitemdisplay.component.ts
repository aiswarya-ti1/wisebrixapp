import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { LocalStorageService } from 'ngx-webstorage';
import { ActivatedRoute } from '@angular/router';
import { OverlayConfig, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { MatDialogRef, MatDialog } from '@angular/material';

import { FormGroup } from '@angular/forms';
import { SingleInputDialogComponent } from '../single-input-dialog/single-input-dialog.component';


interface TenderData {
  lineitem: string,
  comments: string,
  quantity: string,
  rate: string,
  itemamount: string

}



@Component({
  selector: 'app-lineitemdisplay',
  templateUrl: './lineitemdisplay.component.html',
  styleUrls: ['./lineitemdisplay.component.scss']
})

export class LineitemdisplayComponent implements OnInit {


  
  dataSource;
  @Input('tid') tender_ID : number;
  @Input('type') Type_ID : number;
  displayedColumns: string[] = ['lineitems', 'amounts'];
  dialogRef : MatDialogRef<SingleInputDialogComponent>;
  
  constructor(private authService :AuthService,private storage:LocalStorageService,
    private activatedRoute : ActivatedRoute,public overlay: Overlay, private dialog : MatDialog) { }

  ngOnInit() {
    this.getTenderItems(this.tender_ID);
  
    console.log('Type'+this.Type_ID)
  }
  
getTenderItems(tid)
{
  console.log(tid);
this.authService.getSelectedTenderItems(tid).subscribe(result=>{console.log(result);
this.dataSource=result;})
}
addRate(id)
{
 console.log('TenderLab id'+id);
  if(this.Type_ID==2){
    this.dialogRef = this.dialog.open(SingleInputDialogComponent, {
     
      data      : {
      id: id,
      title :'Add Rate',
      msg : 'Please enter the rate against the specification',
    type :2
        
      }
  });

  this.dialogRef.afterClosed()
  .subscribe((response: FormGroup) => {
        this.getTenderItems(this.tender_ID);
      if ( !response )
      {
         
     
      return;
      }
  });
}
}
}
