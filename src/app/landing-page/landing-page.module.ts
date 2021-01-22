import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewHomeComponent } from './new-home/new-home.component';
import { RenovationComponent } from './renovation/renovation.component';
import { ComponentsModule } from '../components/components.module';
import { LandingPageComponent } from './landing-page.component';
import { RouterModule } from '@angular/router';


const routes = [
  
  {
      path        : '',
     component: LandingPageComponent
  },
  {
    path        : 'new-home',
  loadChildren: './new-home/new-home.module#NewHomeModule'
},
{
  path        : 'renovation',
  loadChildren: './renovation/renovation.module#RenovationModule'
},
]
@NgModule({
  declarations: [LandingPageComponent],
  exports:[LandingPageComponent,RouterModule],
  imports: [
     ComponentsModule,CommonModule,
  RouterModule.forChild(routes),
  ]
})
export class LandingPageModule { 
  constructor()
  {
    console.log('landing Module loaded');
  }
}
