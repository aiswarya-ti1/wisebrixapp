import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LocalStorageService } from 'ngx-webstorage';




@Component({
  selector: 'assoc-login',
  templateUrl: './assoc-login.component.html',
  styleUrls: ['./assoc-login.component.scss']
})
export class AssocLoginComponent implements OnInit {
  loginForm: FormGroup;
  assoc_ID : number=0;

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
  assocSignIn(values)
  {
    /*this.authService.biws_sendOTP('7979','8129913939').subscribe(result=>{console.log(result);
    })*/
    console.log(values);
    let user=values;
     this.authService.biws_assocSignIn(user).subscribe(result=>{console.log(result);
      if(result['token']!=false)
      {
        this.storage.store('Token',result['token']);
       // this.authService.biws_assocSignIn(values).subscribe(result1=>{console.log(result1);
         // if(result1['Success']==true)
          //{
            this.assoc_ID=result['Assoc']['Assoc_ID'];
            this.storage.store('AssocID',result['Assoc']['Assoc_ID']);
            this.router.navigate(['assoc-home']);
          }
        //})
      
      else if(result['token']==false)
      {
        alert('Incorrect Username or Password!!');
      }

     });
     
    

  }


  
}
