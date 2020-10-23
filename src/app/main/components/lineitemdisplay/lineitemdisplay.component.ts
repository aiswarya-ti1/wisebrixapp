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
  Total : number;
  words : string;
  a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
  b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
  n ;
  
  constructor(private authService :AuthService,private storage:LocalStorageService,
    private activatedRoute : ActivatedRoute,public overlay: Overlay, private dialog : MatDialog) { }

  ngOnInit() {
    this.getTenderItems(this.tender_ID);
  
    console.log('Type'+this.Type_ID)
    this.getTenderTotal();
  }
  
getTenderItems(tid)
{
  console.log(tid);
this.authService.getSelectedTenderItems(tid).subscribe(result=>{console.log(result);
this.dataSource=result;})
}
chkQntyExists(id)
{
  
}
addRate(id)
{
 console.log('TenderLab id'+id);
 this.authService.chkQtyExists(id).subscribe(result=>{console.log(result);
 if(result==0)
 {
   return;
 }
 else{
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
        this.getTenderTotal();
      if ( !response )
      {
         
     
      return;
      }
  });
}

 }
});
 
  
}
getTenderTotal()
{
  this.authService.getTenderTotal(this.tender_ID).subscribe(result=>{console.log(result);
    this.Total=result;
    this.words=this.inWords(this.Total);

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
}
