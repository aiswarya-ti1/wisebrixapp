import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LocalStorageService } from 'ngx-webstorage';
import { TenderItems } from 'src/app/main/tender/tenderItems';
import { GlobalConstants } from 'src/app/main/globalConstants';
import { Works } from 'src/app/main/work';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/main/components/confirm-dialog/confirm-dialog.component';

import { SingleInputDialogComponent } from 'src/app/main/components/single-input-dialog/single-input-dialog.component';

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
  constructor( private _formBuilder: FormBuilder, private router:Router, private authService :AuthService,
    private activatedRoute : ActivatedRoute,private storage:LocalStorageService, 
    private g:GlobalConstants, private dialog : MatDialog
    //@Inject(LOCAL_STORAGE) public local: LocalStorageService, public session: SessionStorageService
    ) {
    
   }

  ngOnInit() {
    
    
      this.Assoc_ID=this.storage.retrieve('AssocID');
     
      console.log(this.Assoc_ID);

      this.Work_ID=this.g.Work_ID;
      console.log('Work Id'+this.Work_ID);
     
      
      this.getAssocTender(this.Assoc_ID, this.Work_ID);
      
  
   
 
  }
  getAssocTender(aid,wid)
  {
    this.authService.biws_getAssocTender(aid, wid).subscribe(result=>{console.log(result);
      this.details=result;
      this.Tender_ID=result[0]['WorkTender_ID'];
      this.chkWorkDaysExists(this.Tender_ID);

    })
  }
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
                alert('Tendering completed successfully!!');
                this.getAssocTender(this.Assoc_ID, this.Work_ID);
              }
            })   
              
          }
      }
      this.confirmDialogRef = null;
  });
  
  }
  chkWorkDaysExists(tid)
  {
   
this.authService.chkWorkDaysExists(tid).subscribe(result=>{console.log(result);
  this.duration=result;
  //alert(this.duration);
  
});
  }
  addDuration()
  {
    
        this.dialogRef = this.dialog.open(SingleInputDialogComponent, {
          
          data      : {
           id : this.Tender_ID,
           title :'Work Days',
           
           msg : 'Please enter number of days to complete the work',
         type :1
            
          }
      });
    
      this.dialogRef.afterClosed()
      .subscribe(result => {
        this.getAssocTender(this.Assoc_ID, this.Work_ID);
       // this.chkWorkDaysExists();
         
      });

  

  
}

}
