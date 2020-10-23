import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  cust_ID : number=0;

  constructor( public router :Router,private _formBuilder: FormBuilder,private authService: AuthService,
    private storage:LocalStorageService) { 
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
  signIn(values)
  {
    //debugger;
    console.log(values);
    
     let user=values;
     this.authService.biws_SignIn(user).subscribe(result=>{console.log(result);
      if(result['token']!=false)
      {
        this.storage.store('Token',result['token']);
       // this.authService.biws_SignIn(user).subscribe(result=>{console.log(result);
         // if(result['Success']==true)
         // {
          this.storage.store('UserID',result['Cust_ID'][0]['ID']);
            this.storage.store('CustID',result['Cust_ID'][0]['Customer_ID']);
            this.storage.store('CustName',result['Cust_ID'][0]['Cust_FirstName']);
            this.cust_ID=result['Cust_ID'];
            this.router.navigate(['home']);
          //}
        //})
      }
      else if(result['token']==false)
      {
        alert('Incorrect Username or Password!!');
      }
       
     });
    

  }


  
}
