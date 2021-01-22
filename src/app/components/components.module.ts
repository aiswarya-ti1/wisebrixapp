import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavComponent } from './sidenav/sidenav.component';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatStepperModule, MatSnackBarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatTabsModule } from '@angular/material';
import { LineitemdisplayComponent } from './lineitemdisplay/lineitemdisplay.component';
import { KeydeliverablesComponent } from './keydeliverables/keydeliverables.component';
import{FlexLayoutModule} from '@angular/flex-layout'
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { PaymentOverlayComponent } from './payment-overlay/payment-overlay.component';


import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import { SingleInputDialogComponent } from './single-input-dialog/single-input-dialog.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TopNavComponent } from './top-nav/top-nav.component';
import { BackButtonComponent } from './back-button/back-button.component';

import { NgxWebstorageModule } from 'ngx-webstorage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomMaterialModule } from '../custom-material.module';
import { PaymentScheduleComponent } from './pay-schedule/pay-schedule.component';
import { WorkSchedules } from '../customer/cust-main/work-order/workSchedules';
import { WorkScheduleComponent } from './work-schedule/work-schedule.component';




@NgModule({
  declarations: [SidenavComponent, LineitemdisplayComponent,
     KeydeliverablesComponent,TermsandconditionsComponent, PaymentOverlayComponent, SingleInputDialogComponent, 
    ConfirmDialogComponent,  TopNavComponent, BackButtonComponent,PaymentScheduleComponent, WorkScheduleComponent],
  imports: [
    CommonModule,
    CustomMaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,MatInputModule,MatRadioModule,
    MatListModule,
    FlexLayoutModule,
    MatDialogModule,
    SlickCarouselModule, MatStepperModule,FormsModule,ReactiveFormsModule,
    
    MatSnackBarModule,
   MatCardModule,
    NgxWebstorageModule.forRoot(),
    FlexLayoutModule,HttpClientModule,
    MatToolbarModule,MatSidenavModule,MatIconModule,MatTabsModule
    ,MatToolbarModule, MatSidenavModule, 
  ],
  exports: [
    SidenavComponent,CustomMaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,MatInputModule,MatRadioModule,HttpClientModule,
    MatListModule,
    FlexLayoutModule,
    MatDialogModule,
    SlickCarouselModule, MatStepperModule,FormsModule,ReactiveFormsModule,
    
    MatSnackBarModule,
   MatCardModule,
       FlexLayoutModule,
    LineitemdisplayComponent,
    KeydeliverablesComponent,
    TermsandconditionsComponent,
    PaymentOverlayComponent,PaymentScheduleComponent,WorkScheduleComponent,
    
    TopNavComponent,MatToolbarModule, MatSidenavModule,
    BackButtonComponent,MatToolbarModule,MatSidenavModule,MatIconModule,MatTabsModule,
  ],
  entryComponents:[PaymentOverlayComponent,   ConfirmDialogComponent,  SingleInputDialogComponent]
})
export class ComponentsModule { }
