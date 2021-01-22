import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssocRegisterComponent } from './assoc-register.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';

const routes = [
  {
      path     : '',
      component: AssocRegisterComponent, 
     
     
    },
  
      
];

@NgModule({
  declarations: [AssocRegisterComponent],
  exports :[AssocRegisterComponent, ComponentsModule, RouterModule],
  imports: [
    CommonModule, ComponentsModule, 
    RouterModule.forChild(routes),
  ]
})
export class AssocRegisterModule { }
