import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { PasswordConfirmComponent } from './pwd-confirm/pwd-confirm.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { LoginModule } from './login/login.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { OtpVerificationModule } from './otp-verification/otp-verification.module';

const routes = [
  {
      path        : 'login',
      loadChildren: './login/login.module#LoginModule'
      //component : LoginComponent
  },
  {
    path     : 'register',
    loadChildren: './register/register.module#RegisterModule'
    
},

{
  path     : 'otp',
 loadChildren: './otp-verification/otp-verification.module#OtpVerificationModule'
//component:OtpVerificationComponent
  
}
,

{
  path     : 'confirm-pwd/:name',
 loadChildren :'./pwd-confirm/pwd-confirm.module#PwdConfirmModule'
  
},
]

@NgModule({
  declarations: [],
  exports:[ ComponentsModule, RouterModule],
  imports: [
    RouterModule.forChild(routes),
     ComponentsModule, CommonModule, 
  ]
})
export class CustAuthModule {
  constructor()
  {
    console.log('Cust Auth Module started');
  }
 }
