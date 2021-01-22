import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../../auth.service';




@Component({
  selector: 'pwd-confirm',
  templateUrl: './pwd-confirm.component.html',
  styleUrls: ['./pwd-confirm.component.scss']
})
export class PasswordConfirmComponent implements OnInit {

  registerForm: FormGroup;
  userName : string;
  Cust_ID : number=0;

  constructor( private _formBuilder: FormBuilder, private authService :AuthService, private router:Router,
    private activatedRoute: ActivatedRoute, private storage:LocalStorageService, public snackBar :MatSnackBar) {
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
 //this.getCustID();
  }
  getCustID()
  {
    
    this.authService.biws_getCustID(this.userName).subscribe(result=>{console.log(result);
      //this.Cust_ID=result;
      this.storage.store('CustID',result[0]['Customer_ID']);
        this.storage.store('CustName',result[0]['Cust_FirstName']);
    })
  }

  //Password confirmation and Sign up
  pwdCheck(values)
  {
    console.log(values);
    let user=values;
    if(values['pwd']== values['confirm_pwd'])
    {
this.authService.biws_SignUp(user).subscribe(result=>{console.log(result);
  if(result['token']!=false)
      {
        this.openSnackBar('Registration Completed!!',"Ok")
        this.storage.store('Token',result['token']);
       // this.authService.biws_SignIn(user).subscribe(result=>{console.log(result);
         // if(result['Success']==true)
         // {
            this.storage.store('CustID',result['Cust_ID'][0]['Customer_ID']);
            this.storage.store('CustName',result['Cust_ID'][0]['Cust_FirstName']);
            //this.cust_ID=result['Cust_ID'];
            this.router.navigate(['home']);
          //}
        //})
      }
      else if(result['token']==false)
      {
        this.openSnackBar('Something wenr wrong!!', 'Retry');
      }
    }),(error=>{console.log(error);
      this.openSnackBar(error.error.error,'OK');});

  }
  else{
    this.openSnackBar('Password Not Match!!', 'Retry');
  }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
