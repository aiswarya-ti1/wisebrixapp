import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from 'src/app/customer/auth.service';




@Component({
  selector: 'assoc-pwd-confirm',
  templateUrl: './assoc-pwd-confirm.component.html',
  styleUrls: ['./assoc-pwd-confirm.component.scss']
})
export class AssocPasswordConfirmComponent implements OnInit {

  registerForm: FormGroup;
  userName : string;
  Cust_ID : number=0;

  constructor( private _formBuilder: FormBuilder, private authService :AuthService, private router:Router,
    private activatedRoute: ActivatedRoute, private storage:LocalStorageService, public snackBar: MatSnackBar) {
    this.registerForm = new FormGroup(
      {
        confirm_pwd: new FormControl(),
        userName : new FormControl(),
        pwd: new FormControl(),
      })
      this.activatedRoute.params.subscribe((params: Params) => {
    
        this.userName=params['name'];
       
        
      });
     
   }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      userName : ['', Validators.required],
      confirm_pwd   : ['', Validators.required],
      pwd   : ['', Validators.required],
  });
  this.registerForm.controls['userName'].setValue(this.userName);
  console.log('UserName '+this.userName);
 this.getAssocID();
  }

  //API to fetch associate details
  getAssocID()
  {
    
    this.authService.biws_getAssocID(this.userName).subscribe(result=>{console.log(result);
     
      this.storage.store('AssocID',result[0]['Assoc_ID']);
        this.storage.store('AssocName',result[0]['Assoc_FirstName']);
      
    }),(error=>{console.log(error);
      this.openSnackBar(error.error.error,'OK');})
  }

  //API for password confirmation and Sign Up.
  pwdCheck(values)
  {
    console.log(values);
    let user=values;
    if(values['pwd']== values['confirm_pwd'])
    {
this.authService.biws_AssocSignUp(values).subscribe(result=>{console.log(result);
if(result['Success']== true)
{
this.router.navigate(['assoc-home']);
}}),(error=>{console.log(error);
  this.openSnackBar(error.error.error,'OK');})
    }
    else{
this.openSnackBar('Password Not match', 'Retry');
    }


  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
