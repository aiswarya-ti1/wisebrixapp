import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from 'src/app/customer/auth.service';




@Component({
  selector: 'assoc-login',
  templateUrl: './assoc-login.component.html',
  styleUrls: ['./assoc-login.component.scss']
})
export class AssocLoginComponent implements OnInit {
  loginForm: FormGroup;
  assoc_ID : number=0;

  constructor( public router :Router,private _formBuilder: FormBuilder,private authService: AuthService,
    private storage:LocalStorageService, public snackBar: MatSnackBar
    ) { 
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
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  //Associate Login API
  assocSignIn(values)
  {
    
    //console.log(values);
    let user=values;
     this.authService.biws_assocSignIn(user).subscribe(result=>{console.log(result);
      if(result['token']!=false)
      {
        this.openSnackBar('Login Successfully!!','OK');
        this.storage.store('Token',result['token']);
       // this.authService.biws_assocSignIn(values).subscribe(result1=>{console.log(result1);
         // if(result1['Success']==true)
          //{
            this.assoc_ID=result['Assoc']['Assoc_ID'];
            this.storage.store('AssocID',result['Assoc']['Assoc_ID']);
            this.storage.store('Role_ID',result['Assoc']['Role_ID']);
            this.router.navigate(['assoc-home']);
          }
        //})
      
      else if(result['token']==false)
      {
        this.openSnackBar('Incorrect Username or Password!!', 'Retry');
      }

     }),
     (error=>{console.log(error);
    this.openSnackBar(error.error.error,'OK');});
     
    

  }


  
}
