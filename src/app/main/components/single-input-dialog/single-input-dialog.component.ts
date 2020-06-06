import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { AuthService } from 'src/app/auth/auth.service';
import { TenderItems } from '../../tender/tenderItems';
import { Title } from '@angular/platform-browser';
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
    
    constructor(
        public matDialogRef: MatDialogRef<SingleInputDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder, private authService : AuthService,
        
      
    )
    {
        this.workForm = new FormGroup(
            {
              TL_ID: new FormControl(),
              rate : new FormControl(),
        
             
            });
       
    }
    ngOnInit() {
      //alert(this._data['tlid']);
      this.workForm.controls['TL_ID'].setValue(this._data['tlid']);
      this.title=this._data['title'];
      this.Msg=this._data['msg'];
      this.Type_ID=this._data['type'];
        this.workForm = this._formBuilder.group({
           
          TL_ID: [this._data['id']],
          rate :[''],
         

        });
        if(this.Type_ID==2)
        {
          this.getItemDetails(this._data['id']) ;
        }
       
    }
    getItemDetails(id)
    {
      this.authService.getItemDetails(id).subscribe(result=>{console.log(result);
        this.items=result;
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
    
          alert('Rate added successfully!!');
          this.matDialogRef.close();
        }})
      }
      else if(this.Type_ID==1)
      {
        this.authService.save_workDays(values).subscribe(result=>{console.log(result);
        })
      }
      
    }
    onNoClick()
    {
      this.matDialogRef.close();
    }
   
}
