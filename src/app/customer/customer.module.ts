import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustAuthModule } from './cust-auth/cust-auth.module';
import { CustMainModule } from './cust-main/cust-main.module';
import { ComponentsModule } from '../components/components.module';
import { Routes } from '@angular/router';
import { MatListModule, MatNavList } from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CustAuthModule, CustMainModule, MatListModule,CommonModule
  ],
  exports:[ CustAuthModule, CustMainModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
  
})
export class CustomerModule {
  constructor()
  {
    console.log('Customer Module started');
  }
 }
