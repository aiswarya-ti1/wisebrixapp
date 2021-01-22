import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { HttpInterceptorHandler } from '@angular/common/http/src/interceptor';
import { TokenInterceptorService } from './token-interceptor.service';

import { MatSnackBarModule } from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import { GlobalConstants } from './customer/cust-main/globalConstants';
import { AssociateModule } from './associate/associate.module';
import { CustomerModule } from './customer/customer.module';
import { LandingPageModule } from './landing-page/landing-page.module';

const appRoutes: Routes = [
 
  {
    path: 'login',
    loadChildren :'./customer/cust-auth/login/login.module#LoginModule'
},
{
  path : 'otp/:name',
loadChildren :'./customer/cust-auth/otp-verification/otp-verification.module#OtpVerificationModule'

},
{
  path : 'confirm-pwd/:name',
loadChildren :'./customer/cust-auth/pwd-confirm/pwd-confirm.module#PwdConfirmModule'

},
{
  path     : 'register',
  loadChildren: './customer/cust-auth/register/register.module#RegisterModule'
},
{
  path: 'home',
  loadChildren :'./customer/cust-main/cust-main.module#CustMainModule'
},

  {
    path: 'assoc-login',
    loadChildren :'./associate/assoc-auth/assoc-auth.module#AssocAuthModule'
},
  {
path : 'assoc-otp/:name',
loadChildren :'./associate/assoc-auth/assoc-otp-verification/assoc-otp-verification.module#AssocOtpVerificationModule'

},
{
  path : 'assoc-confirm-pwd/:name',
loadChildren :'./associate/assoc-auth/assoc-pwd-confirm/assoc-pwd-confirm.module#AssocPwdConfirmModule'

},
{
  path     : 'assoc-register',
  loadChildren: './associate/assoc-auth/assoc-register/assoc-register.module#AssocRegisterModule'
},

{
  path: 'assoc-home',
  loadChildren :'./associate/assoc-main/assoc-main.module#AssocMainModule'
},
{
    path: 'landing-page',
    loadChildren :'./landing-page/landing-page.module#LandingPageModule'
},
{
  path: 'new-home',
  loadChildren :'./landing-page/new-home/new-home.module#NewHomeModule'
},
{
path: 'renovation',
loadChildren :'./landing-page/renovation/renovation.module#RenovationModule'
},
  { path: '', redirectTo: '/landing-page', pathMatch: 'full' }
 
];


@NgModule({
  declarations: [
    AppComponent,
    
    
    
    
    
  ],
  imports: [
    BrowserAnimationsModule,HttpClientModule,
    
    
    RouterModule.forRoot(appRoutes),
    NgxWebstorageModule.forRoot(),
    


  ],
  exports:[RouterModule,BrowserAnimationsModule],
  providers: [HttpClientModule, GlobalConstants,
    {provide: LocationStrategy, 
    useClass: HashLocationStrategy,},
    /*{
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi:true
  
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor()
  {
    console.log('App Module loaded');
  }
}
/**/
