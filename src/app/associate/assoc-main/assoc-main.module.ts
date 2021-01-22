import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssocHomeComponent } from './assoc-home/assoc-home.component';
import { AssocDashboardComponent } from './assoc-dashboard/assoc-dashboard.component';
import { AssocTenderComponent } from './assoc-tender/assoc-tender.component';
import { MatIconModule, MatListModule, MatSidenavModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path     : '',
    component: AssocHomeComponent
     
    },
  
      
];

@NgModule({
  declarations: [AssocHomeComponent,AssocDashboardComponent,AssocTenderComponent],
  exports:[AssocHomeComponent, ComponentsModule,AssocDashboardComponent,AssocTenderComponent,RouterModule],
  imports: [
    RouterModule.forChild(routes),
     ComponentsModule, CommonModule
  ]
})
export class AssocMainModule {
  constructor()
  {
    console.log('Assoc main Module loaded');
  }
 }
