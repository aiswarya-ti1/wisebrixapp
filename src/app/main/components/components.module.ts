import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../../custom-material.module';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { WbtableComponent } from './wbtable/wbtable.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { LineitemdisplayComponent } from './lineitemdisplay/lineitemdisplay.component';
import { KeydeliverablesComponent } from './keydeliverables/keydeliverables.component';
import{FlexLayoutModule} from '@angular/flex-layout'
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { PaymentOverlayComponent } from './payment-overlay/payment-overlay.component';


import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import { SingleInputDialogComponent } from './single-input-dialog/single-input-dialog.component';



@NgModule({
  declarations: [SidenavComponent,WbtableComponent, LineitemdisplayComponent,
     KeydeliverablesComponent,TermsandconditionsComponent, PaymentOverlayComponent, SingleInputDialogComponent, 
    ConfirmDialogComponent,],
  imports: [
    CommonModule,
    CustomMaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    MatDialogModule
    
    
  ],
  exports: [
    SidenavComponent,
    WbtableComponent,
    LineitemdisplayComponent,
    KeydeliverablesComponent,
    TermsandconditionsComponent,
    PaymentOverlayComponent
  ],
  entryComponents:[PaymentOverlayComponent,   ConfirmDialogComponent,  SingleInputDialogComponent]
})
export class ComponentsModule { }
