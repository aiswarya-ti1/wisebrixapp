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
        pwd : new FormControl(),
  
      });
  }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username   : ['', Validators.required],
      pwd: ['', Validators.required]
  });
  }
  assocSignIn(values)
  {
    console.log(values);
    this.authService.biws_assocSignIn(values).subscribe(result=>{console.log(result);
      if(result['Success']==true)
      {
        this.assoc_ID=result['Assoc'];
        this.storage.store('AssocID',result['Assoc']);
        this.router.navigate(['assoc-home']);
      }
    })

  }


  
}
