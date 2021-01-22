import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssocOtpVerificationComponent } from './assoc-otp-verification.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';

const routes = [
  {
      path     : '',
      component: AssocOtpVerificationComponent, 
     
    },
  
      
];

@NgModule({
  declarations: [AssocOtpVerificationComponent],
  exports:[AssocOtpVerificationComponent, ComponentsModule],
  imports: [
    RouterModule.forChild(routes),
    CommonModule, ComponentsModule
  ]
})
export class AssocOtpVerificationModule { }
