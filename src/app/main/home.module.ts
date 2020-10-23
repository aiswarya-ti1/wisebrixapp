import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { CustomerdashboardComponent } from './customerdashboard/customerdashboard.component';

import { LayoutModule } from '@angular/cdk/layout';
import { ComponentsModule } from './components/components.module';
import { CustomMaterialModule } from '../custom-material.module';
import { Routes, RouterModule } from '@angular/router';
import { TenderComponent } from './tender/tender.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WorkOrderComponent } from './work-order/work-order.component';


@NgModule({
  declarations: [ HomeComponent, CustomerdashboardComponent, TenderComponent, WorkOrderComponent],
  imports: [
    CommonModule,    
    LayoutModule,
    CustomMaterialModule,
    ComponentsModule,
    RouterModule,
    FlexLayoutModule
  
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
