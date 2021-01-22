import { Component, OnInit, Input } from '@angular/core';

import { LocalStorageService } from 'ngx-webstorage';
import { ActivatedRoute } from '@angular/router';
import { OverlayConfig, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';

import { FormGroup } from '@angular/forms';
import { SingleInputDialogComponent } from '../single-input-dialog/single-input-dialog.component';
import { AuthService } from 'src/app/customer/auth.service';
import { GlobalConstants } from 'src/app/customer/cust-main/globalConstants';


interface TenderData {
  lineitem: string,
  comments: string,
  quantity: string,
  rate: string,
  itemamount: string
 Role_ID : number;
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
  Role_ID : number;
  
  constructor(private authService :AuthService,private storage:LocalStorageService, public g:GlobalConstants,
    private activatedRoute : ActivatedRoute,public overlay: Overlay, private dialog : MatDialog,
    public snackBar:MatSnackBar) { }

  ngOnInit() {
    this.getTenderItems(this.tender_ID);
  
    console.log('Type'+this.Type_ID)
    this.getTenderTotal();
    this.Role_ID=this.storage.retrieve('Role_ID');
    console.log('Role'+this.Role_ID);
    if(this.Type_ID==3)
    {
      this.getFinalTender();
    }
  }
  
  //Get all line items for a particular work id
getTenderItems(tid)
{
  console.log(tid);
this.authService.getSelectedTenderItems(tid).subscribe(result=>{console.log(result);
this.dataSource=result;}),(error=>{console.log(error);
  this.openSnackBar(error.error.error,'OK');})
}

//API to get finalized tender items only.
getFinalTender()
{
  this.authService.getFinalTender(this.g.Work_ID).subscribe(result=>{console.log(result);
    this.dataSource=result;
  }),(error=>{console.log(error);
    this.openSnackBar(error.error.error,'OK');})
}
chkQntyExists(id)
{
  
}
//To add rates to each line item except quantity is null. For Associate Module only.
addRate(id,flag)
{
 console.log('TenderLab id'+id);
 this.authService.chkQtyExists(id).subscribe(result=>{console.log(result[0]);
 
 if(result[0]!=0){
  if(this.Type_ID==2 || flag==2){
    this.dialogRef = this.dialog.open(SingleInputDialogComponent, {
     
      data      : {
      id: id,
      title :'Add Rate',
      msg : 'Please enter the rate against the specification',
    type :2,
    flag :flag
        
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

//To display tender total 
getTenderTotal()
{
  this.authService.getTenderTotal(this.tender_ID).subscribe(result=>{console.log(result);
    this.Total=result;
    this.words=this.inWords(this.Total);

  }),(error=>{console.log(error);
    this.openSnackBar(error.error.error,'OK');})
}

//Function to convert a number to in words
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
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }
  
}
