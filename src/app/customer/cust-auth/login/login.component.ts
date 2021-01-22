import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  cust_ID : number=0;

  constructor( public router :Router,private _formBuilder: FormBuilder,private authService: AuthService,
    private storage:LocalStorageService,public snackBar: MatSnackBar) { 
    this.loginForm = new FormGroup(
      {
        username: new FormControl(),
        password : new FormControl(),
  
      });
  }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username   : ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  //Customer login
  signIn(values)
  {
    //debugger;
    console.log(values);
    
     let user=values;
     this.authService.biws_SignIn(user).subscribe(result=>{console.log(result);
      if(result['token']!=false)
      {
        this.openSnackBar('Login Successfully!!','Ok');

        this.storage.store('Token',result['token']);
       // this.authService.biws_SignIn(user).subscribe(result=>{console.log(result);
         // if(result['Success']==true)
         // {
          this.storage.store('UserID',result['Cust_ID'][0]['ID']);
            this.storage.store('CustID',result['Cust_ID'][0]['Customer_ID']);
            this.storage.store('CustName',result['Cust_ID'][0]['Cust_FirstName']);
            this.storage.store('Role_ID',result['Cust_ID'][0]['Role_ID'])
            this.cust_ID=result['Cust_ID'];
            this.router.navigate(['home']);
          //}
        //})
      }
      else if(result['token']==false)
      {
        this.openSnackBar('Incorrect Username or Password!!', "Ok");
      }
       
     }),(error=>{console.log(error);
      this.openSnackBar(error.error.error,'OK');});
    

  }

openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
}
