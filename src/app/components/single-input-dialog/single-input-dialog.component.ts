import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';



import { AuthService } from 'src/app/customer/auth.service';
import { TenderItems } from 'src/app/customer/cust-main/tender/tenderItems';
@Component({
    selector     : 'single-input-dialog',
    templateUrl  : './single-input-dialog.component.html',
    styleUrls    : ['./single-input-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SingleInputDialogComponent
{
    action: string;
    workForm: FormGroup;
    dialogTitle: string;
    items:TenderItems;
    Type_ID : number;
    Msg : string;
    title : string;
    Update_Flag : number;
    WorkDays : number;
    item_rate:number;
    Contact_ID : number;
    
    constructor(
        public matDialogRef: MatDialogRef<SingleInputDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder, private authService : AuthService,
        public snackBar: MatSnackBar
      
    )
    {
        this.workForm = new FormGroup(
            {
              TL_ID: new FormControl(),
              rate : new FormControl(),
              contact_id : new FormControl()
        
             
            });
       
    }
    ngOnInit() {
      //alert(this._data['tlid']);
      this.workForm.controls['TL_ID'].setValue(this._data['tlid']);
      this.title=this._data['title'];
      this.Msg=this._data['msg'];
      this.Type_ID=this._data['type'];
      this.Update_Flag=this._data['flag'];
      this.Contact_ID=this._data['contact'];
        this.workForm = this._formBuilder.group({
           
          TL_ID: [this._data['id']],
          rate :[''],
          contact_id :['']
         

        });
        if(this.Type_ID==2  && !this.Update_Flag)
        {
          this.getItemDetails(this._data['id']) ;
        }
        if(this.Update_Flag==2 && this.Type_ID==1)
        {
         // console.log('hi');

this.getWorkDays(this._data['id']);
        }
        if(this.Update_Flag==2 && this.Type_ID==2)
        {
           this.getItemDetails(this._data['id']) ;
          this.getItemRate(this._data['id']);
        }
        if( this.Type_ID==3)
        {
          this.workForm.controls['contact_id'].setValue(this.Contact_ID);
        }
       
    }
    getItemRate(id)
    {
this.authService.getItemRate(id).subscribe(result=>{console.log(result);
  this.workForm.controls['rate'].setValue(result);
})
    }
    
    getWorkDays(tid)
    {
      this.authService.getWorkDays(tid).subscribe(result=>{console.log(result);
    
    
        this.workForm.controls['rate'].setValue(result);
      });
    }
    getItemDetails(id)
    {
      this.authService.getItemDetails(id).subscribe(result=>{console.log(result);
        this.items=result;
        this.workForm.controls['rate'].setValue(this.items['Rate']);
        this.item_rate=this.items['Rate'];
      })
    }
    saveRate(values)
    {
      console.log(values);
      if(this.Type_ID==2)
      {
        this.authService.biws_saveTenderRate(values).subscribe(result=>{console.log(result);
          if(result['Success']==true)
        {
    
          this.openSnackBar('Rate added successfully!!', "Ok");
          this.matDialogRef.close();
        }})
      }
      else if(this.Type_ID==1)
      {
        this.authService.save_workDays(values).subscribe(result=>{console.log(result);
          this.openSnackBar('Work duration added successfully!!', "Ok");
          this.matDialogRef.close();
        })
      }
      else if(this.Type_ID==3)
      {
        this.authService.saveEmailID(values).subscribe(result=>{console.log(result);
          this.openSnackBar('Email Updated successfully!!', "Ok");
          this.matDialogRef.close({data: result['Success']});
        })
      }
      
    }
    
    onNoClick()
    {
      this.matDialogRef.close();
    }
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }
}
