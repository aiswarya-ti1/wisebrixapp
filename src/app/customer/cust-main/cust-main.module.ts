import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CustomerdashboardComponent } from './customerdashboard/customerdashboard.component';
import { TenderComponent } from './tender/tender.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { MatIconModule, MatListModule, MatSidenavModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { TimelineComponent } from 'src/app/components/timeline/timeline.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';
const routes = [
  
{
  path :'',
  component :HomeComponent,
  //canActivate: [AuthGuard]
},
]

@NgModule({
  declarations: [HomeComponent,CustomerdashboardComponent,TenderComponent,WorkOrderComponent, TimelineComponent],
  exports:[HomeComponent, ComponentsModule, RouterModule],
  imports: [
    RouterModule.forChild(routes),
    ComponentsModule, CommonModule
  ]
})
export class CustMainModule {
  constructor()
  {
    console.log('Cust main Module started');
  }
 }
