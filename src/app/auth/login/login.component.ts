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
        pwd : new FormControl(),
  
      });
  }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username   : ['', Validators.required],
      pwd: ['', Validators.required]
  });
  }
  signIn(values)
  {
    console.log(values);
    this.authService.biws_SignIn(values).subscribe(result=>{console.log(result);
      if(result['Success']==true)
      {
        this.storage.store('CustID',result['Cust_ID'][0]['Customer_ID']);
        this.storage.store('CustName',result['Cust_ID'][0]['Cust_FirstName']);
        this.cust_ID=result['Cust_ID'];
        this.router.navigate(['home']);
      }
    })

  }


  
}
