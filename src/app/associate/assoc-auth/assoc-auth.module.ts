import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssocOtpVerificationComponent } from './assoc-otp-verification/assoc-otp-verification.component';
import { AssocPasswordConfirmComponent } from './assoc-pwd-confirm/assoc-pwd-confirm.component';
import { AssocRegisterComponent } from './assoc-register/assoc-register.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { AssocLoginModule } from './assoc-login/assoc-login.module';
const routes = [
  {
    path:'assoc-login',
  loadChildren : './assoc-login/assoc-login.module#AssocLoginModule'

  },
  
  
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule, ComponentsModule, AssocLoginModule
  ],
  exports:[]
})
export class AssocAuthModule { 
  constructor()
  {
    console.log('Assoc Auth loaded');
  }
}
