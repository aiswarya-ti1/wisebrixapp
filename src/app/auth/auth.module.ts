import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { CustomMaterialModule } from '../custom-material.module';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { AuthService } from './auth.service';
import { PasswordConfirmComponent } from './pwd-confirm/pwd-confirm.component';
import { HttpClientModule } from '@angular/common/http';

import { LandingPageComponent } from '../landing-page/landing-page.component';
import { AssocLoginComponent } from '../assoc-auth/assoc-login/assoc-login.component';
import { AssocDashboardComponent } from '../assoc-auth/assoc-dashboard/assoc-dashboard.component';
import { AssocTenderComponent } from '../assoc-auth/assoc-tender/assoc-tender.component';
import { AssocHomeComponent } from '../assoc-auth/assoc-home.component';
import { ComponentsModule } from '../main/components/components.module';











@NgModule({
  declarations: [LoginComponent, RegisterComponent,OtpVerificationComponent,AssocLoginComponent,
     PasswordConfirmComponent, LandingPageComponent, AssocDashboardComponent,AssocTenderComponent, AssocHomeComponent],
  imports: [
    
    CommonModule,ReactiveFormsModule,FormsModule,
    CustomMaterialModule, RouterModule,HttpClientModule, ComponentsModule
  ],
  exports:[RouterModule,ReactiveFormsModule,FormsModule,LandingPageComponent,AssocLoginComponent,
    LoginComponent, RegisterComponent,OtpVerificationComponent,PasswordConfirmComponent,
    AssocDashboardComponent, AssocTenderComponent,AssocHomeComponent,
  ],
  
  entryComponents: [
        
  ],
  providers:[AuthService, HttpClientModule]
})
export class AuthModule { }
