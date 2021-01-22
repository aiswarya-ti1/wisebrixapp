import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenovationComponent } from './renovation.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
const routes = [
  
  
  {
    path        : '',
   component: RenovationComponent
},

]
@NgModule({
  declarations: [RenovationComponent,],
  exports:[RenovationComponent, RouterModule],
  imports: [
     ComponentsModule,CommonModule,
  RouterModule.forChild(routes),
  ]
})
export class RenovationModule { }
