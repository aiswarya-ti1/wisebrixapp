import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';




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
    private activatedRoute: ActivatedRoute, private storage:LocalStorageService) {
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
 this.getCustID();
  }
  getCustID()
  {
    
    this.authService.biws_getCustID(this.userName).subscribe(result=>{console.log(result);
      //this.Cust_ID=result;
      this.storage.store('CustID',result[0]['Customer_ID']);
        this.storage.store('CustName',result[0]['Cust_FirstName']);
    })
  }
  pwdCheck(values)
  {
    console.log(values);
    if(values['pwd']== values['confirm_pwd'])
    {
this.authService.biws_SignUp(values).subscribe(result=>{console.log(result);
if(result['Success']== true)
{
this.router.navigate(['home']);
}})
    }
    else{
alert('Password Not match');
    }


  }

}
