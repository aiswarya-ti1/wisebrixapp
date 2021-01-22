import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
//import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';



@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor( private _formBuilder: FormBuilder, private authService :AuthService, private router:Router,
    //@Inject(LOCAL_STORAGE) public local: LocalStorageService, public session: SessionStorageService
    ) {
    this.registerForm = new FormGroup(
      {
        phNo: new FormControl(),
      })
   }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      phNo   : ['', Validators.required]
  });
 
  }
  sendOTP(values)
  {
    
    //this.local.set('username',JSON.stringify('Aiswarya'));
/*this.authService.biws_sendOTP(values).subscribe(result=>{console.log(result);
if(result['Success']== true)
{

}}),(error=>{console.log(error);
      this.openSnackBar(error.error.error,'OK');})*/
console.log('User Name '+values['phNo']);
this.router.navigate(['otp/'+values['phNo']]);
  }
  

}
