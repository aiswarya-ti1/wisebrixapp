import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Router } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from 'src/app/customer/auth.service';
//import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';



@Component({
  selector: 'assoc-register',
  templateUrl: './assoc-register.component.html',
  styleUrls: ['./assoc-register.component.scss']
})
export class AssocRegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor( private _formBuilder: FormBuilder, private authService :AuthService, private router:Router,
    private storage:LocalStorageService, public snackBar: MatSnackBar
    //@Inject(LOCAL_STORAGE) public local: LocalStorageService, public session: SessionStorageService
    ) {
    this.registerForm = new FormGroup(
      {
        phNo: new FormControl(),
        email: new FormControl(),
contact: new FormControl(),
name: new FormControl(),
      })
   }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      phNo   : ['', Validators.required],
      email  : [''],
contact  : ['', Validators.required],
name  : ['', Validators.required],
  });
 
  }

  //Asssociate Registration
  sendOTP(values)
  {
    //alert(values.phNo);
   this.authService.biws_getAssocID(values.phNo).subscribe(result=>{console.log(result);
      if(result.length==0)
      {
        //this.openSnackBar('Associate Not exists', );
        this.authService.biws_addAssociate(values).subscribe(result1=>{console.log(result1);
          if(result1['Success']== true)
  {
    console.log('User Name '+values['phNo']);
    this.router.navigate(['assoc-otp/'+values.phNo]);
    this.storage.store('AssocID',result1[0]['Assoc_ID']);
  }

         
        }),(error=>{console.log(error);
          this.openSnackBar(error.error.error,'OK');})
      }
      else{
        this.openSnackBar('Associate already exists', "Ok");
      //this.Cust_ID=result;
      this.authService.biws_updateAssociate(result[0]['Assoc_ID']).subscribe(result2=>{console.log(result2);
        if(result2['Success']== true)
  {
   
    this.router.navigate(['assoc-otp/'+result[0]['Assoc_ID']]);
  }
      }),(error=>{console.log(error);
        this.openSnackBar(error.error.error,'OK');})
      this.storage.store('AssocID',result[0]['Assoc_ID']);
        this.storage.store('AssocName',result[0]['Assoc_FirstName']);
      }
     
    })
    
    //this.local.set('username',JSON.stringify('Aiswarya'));
/*this.authService.biws_sendOTP(values).subscribe(result=>{console.log(result);
if(result['Success']== true)
{

}})*/


  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
