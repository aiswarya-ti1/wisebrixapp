import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CustomMaterialModule } from './custom-material.module';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { OtpVerificationComponent } from './auth/otp-verification/otp-verification.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PasswordConfirmComponent } from './auth/pwd-confirm/pwd-confirm.component';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './main/home.component';
import { HomeModule } from './main/home.module';
import { AssocLoginComponent } from './assoc-auth/assoc-login/assoc-login.component';
//import { AngularWebStorageModule } from 'angular-web-storage';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GlobalConstants } from './main/globalConstants';
import { AssocDashboardComponent } from './assoc-auth/assoc-dashboard/assoc-dashboard.component';
import { AssocHomeComponent } from './assoc-auth/assoc-home.component';

const routes:Routes = [
  {
    path :'login',
    component : LoginComponent
  },
  {
    path :'assoc-login',
    component : AssocLoginComponent
  },
  {
    path     : 'register',
    component: RegisterComponent
},
{
  path     : 'otp/:name',
  component: OtpVerificationComponent
},
{
  path     : 'confirm-pwd/:name',
  component: PasswordConfirmComponent
},
{
  path     : 'landing-page',
  component: LandingPageComponent
},
{
  path     : 'assoc-home',
  component: AssocHomeComponent
}
,
{
  path :'home',
  component :HomeComponent
},
{ path: '', redirectTo: '/landing-page', pathMatch: 'full' }



];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,HomeModule,
    AuthModule,FormsModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    RouterModule.forRoot(routes),
    NgxWebstorageModule.forRoot(),
    FlexLayoutModule
     

  ],
  providers: [HttpClientModule, GlobalConstants],
  bootstrap: [AppComponent]
})
export class AppModule { }
