import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpVerificationComponent } from './otp-verification.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';



const routes = [
  {
      path     : '',
      component: OtpVerificationComponent, 
     
     
    },
  
      
];

@NgModule({
  declarations: [OtpVerificationComponent],
  exports :[OtpVerificationComponent, ComponentsModule, RouterModule],
  imports: [
    CommonModule, ComponentsModule, 
    RouterModule.forChild(routes),
  ]
})
export class OtpVerificationModule { 
  constructor()
  {
    console.log('otp verification start')
  }
}
