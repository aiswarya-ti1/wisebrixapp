import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';
import { NewHomeComponent } from './new-home.component';
const routes = [
  
  
  {
    path        : '',
   component: NewHomeComponent
},

]
@NgModule({
  declarations: [NewHomeComponent,],
  exports:[NewHomeComponent, RouterModule],
  imports: [
     ComponentsModule,CommonModule,
  RouterModule.forChild(routes),
  ]
})
export class NewHomeModule {
  constructor()
  {
    console.log('NewHome start')
  }
 }
