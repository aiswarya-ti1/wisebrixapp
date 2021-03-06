import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../auth.service';
//import { LocalStorageService, SessionStorageService } from 'angular-web-storage';




@Component({
  selector: 'otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {

  otpForm: FormGroup;
  userName : string;
  otp : number=0;
  otp_ID : string;

  constructor( private _formBuilder: FormBuilder, private authService :AuthService, private router : Router,
    private activatedRoute: ActivatedRoute, public snackBar :MatSnackBar
   // @Inject(LOCAL_STORAGE) public local: LocalStorageService, public session: SessionStorageService
   ) {
    
    this.otpForm = new FormGroup(
      {
        otpNo: new FormControl(),
        sendOTP : new FormControl()
      })
      //this.userName=JSON.parse(this.local.get('username'));

   }

  ngOnInit() {
    this.otpForm = this._formBuilder.group({
      otpNo   : ['', Validators.required],
      sendOTP :['', Validators.required]
  });
  this.activatedRoute.params.subscribe((params: Params) => {
    
    this.userName=params['name'];
   
    
  });
  this.generateOTP();
  
 
  }

  //API to verify otp
  verifyOTP(values)
  {
    console.log('OTP entered'+values['otpNo']);
    console.log('OTP'+this.otp);
if(values['otpNo']== this.otp)
{
  this.openSnackBar('OTP Match', "Ok");
  this.router.navigate(['confirm-pwd/'+this.userName]);
}
else{
  this.openSnackBar('Not match', 'Retry');
}
/*this.authService.verify_OTP(this.otp_ID,values['otpNo']).subscribe(result=>{console.log(result);
  if(result['Status']=='Success')
  {
    this.router.navigate(['confirm-pwd/'+this.userName]);
  }
  else{
    alert(result['Details']);
  }
}),(error=>{console.log(error);
      this.openSnackBar(error.error.error,'OK');})*/

  }
  //Generate OTP and sent to customer as SMS
  generateOTP()
  {
    this.authService.biws_generateOTP(this.userName).subscribe(result=>{console.log(result);
      this.otp=result;
      this.otpForm.controls['sendOTP'].setValue(result);
      /*if(result['Status']=='Success')
      {
        this.otp_ID=result['Details'];
        alert('OTP send successfully!!');

      }
      else{
        alert('Please check phone number entered!!');
      }*/
    }),(error=>{console.log(error);
      this.openSnackBar(error.error.error,'OK');})
    /*if(this.otp!=0)
    {
      this.authService.biws_sendOTP(this.otp, this.userName).subscribe(result=>{console.log(result);
    })
   
     
    }*/
  }
 
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
