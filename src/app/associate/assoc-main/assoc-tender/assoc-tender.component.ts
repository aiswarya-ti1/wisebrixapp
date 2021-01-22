import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';

import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/customer/auth.service';
import { GlobalConstants } from 'src/app/customer/cust-main/globalConstants';
import { Works } from 'src/app/customer/cust-main/work';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { SingleInputDialogComponent } from 'src/app/components/single-input-dialog/single-input-dialog.component';

//import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';



@Component({
  selector: 'assoc-tender',
  templateUrl: './assoc-tender.component.html',
  styleUrls: ['./assoc-tender.component.scss']
})
export class AssocTenderComponent implements OnInit {

 
 Assoc_ID : number;
 AssocName : string;
 Work_ID : number;
 details:Works[];
 assocForm : FormGroup;
 Tender_ID : number;
 confirmDialogRef : MatDialogRef<ConfirmDialogComponent>;
 dialogRef :MatDialogRef<SingleInputDialogComponent>;
 duration : number;
 WorkDays :number;
 StatusName : string;
  constructor( private _formBuilder: FormBuilder, private router:Router, private authService :AuthService,
    private activatedRoute : ActivatedRoute,private storage:LocalStorageService, 
    private g:GlobalConstants, private dialog : MatDialog, public snackBar: MatSnackBar
    //@Inject(LOCAL_STORAGE) public local: LocalStorageService, public session: SessionStorageService
    ) {
    
   }

  ngOnInit() {
    
    
      this.Assoc_ID=this.storage.retrieve('AssocID');
     
      console.log(this.Assoc_ID);

      this.Work_ID=this.g.Work_ID;
      console.log('Work Id'+this.Work_ID);
     
      
      this.getAssocTender(this.Assoc_ID, this.Work_ID);
      this.getAssocStatus();
      
  
   
 
  }

  //Get Tender Details for a particular work
  getAssocTender(aid,wid)
  {
    this.authService.biws_getAssocTender(aid, wid).subscribe(result=>{console.log(result);
      this.details=result;
      this.Tender_ID=result[0]['WorkTender_ID'];
      this.chkWorkDaysExists(this.Tender_ID);

    }),(error=>{console.log(error);
      this.openSnackBar(error.error.error,'OK');})
  }

  //Tender Submission
  finishTender(tid)
  {
    this.confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
  });

  this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to finish tendering?';

  this.confirmDialogRef.afterClosed().subscribe(result => {
      if ( result )
      {
          if(result==true)
          {
             
            this.authService.biws_pushBackToPMA(this.Tender_ID).subscribe(result=>{console.log(result);
              if(result['Success']==true)
              {
                this.openSnackBar('Tendering completed successfully!!' ,"Ok");
                this.getAssocTender(this.Assoc_ID, this.Work_ID);
              }
            }),(error=>{console.log(error);
              this.openSnackBar(error.error.error,'OK');})   
              
          }
      }
      this.confirmDialogRef = null;
  });
  
  }

  //To confirm work days updated or not
  chkWorkDaysExists(tid)
  {
   
this.authService.chkWorkDaysExists(tid).subscribe(result=>{console.log(result);
  this.duration=result;
 // this.WorkDays=result['Days'];
  //alert(this.duration);
  
}),(error=>{console.log(error);
  this.openSnackBar(error.error.error,'OK');});
  }

  
  addDuration(flag)
  {
    
        this.dialogRef = this.dialog.open(SingleInputDialogComponent, {
          
          data      : {
           id : this.Tender_ID,
           title :'Work Days',
           
           msg : 'Please enter number of days to complete the work',
         type :1,
         flag :flag
            
          }
      });
    
      this.dialogRef.afterClosed()
      .subscribe(result => {
        this.getAssocTender(this.Assoc_ID, this.Work_ID);
       // this.chkWorkDaysExists();
         
      });

  

  
}

//To get associate status to display on  tender
getAssocStatus()
{
  this.authService.getAssocStatus(this.Assoc_ID, this.Work_ID).subscribe(result=>{console.log(result);
    this.StatusName=result[0]['Tender_Status_Name'];
  }),(error=>{console.log(error);
    this.openSnackBar(error.error.error,'OK');})
}
openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
  });
}

}
