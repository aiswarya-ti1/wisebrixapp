import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssocPasswordConfirmComponent } from './assoc-pwd-confirm.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';



const routes = [
  {
      path     : '',
      component: AssocPasswordConfirmComponent, 
     
     
    },
  
      
];

@NgModule({
  declarations: [AssocPasswordConfirmComponent],
  exports :[AssocPasswordConfirmComponent, ComponentsModule, RouterModule],
  imports: [
    CommonModule, ComponentsModule, 
    RouterModule.forChild(routes),
  ]
})
export class AssocPwdConfirmModule { }
