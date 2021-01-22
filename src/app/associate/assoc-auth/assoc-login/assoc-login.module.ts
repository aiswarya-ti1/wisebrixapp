import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssocLoginComponent } from './assoc-login.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
const routes = [
  {
      path     : '',
      component: AssocLoginComponent, 
     
    },
  
      
];

@NgModule({
  declarations: [AssocLoginComponent],
  exports:[AssocLoginComponent, ComponentsModule],
  imports: [
    RouterModule.forChild(routes),
    CommonModule, ComponentsModule
  ]
})
export class AssocLoginModule { }
