import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';

const routes = [
  {
      path     : '',
      component: RegisterComponent, 
     
    },
  
      
];

@NgModule({
  declarations: [RegisterComponent],
  exports :[RegisterComponent, ComponentsModule, RouterModule],
  imports: [
    CommonModule, ComponentsModule, 
    RouterModule.forChild(routes),
  ]
})
export class RegisterModule { }
