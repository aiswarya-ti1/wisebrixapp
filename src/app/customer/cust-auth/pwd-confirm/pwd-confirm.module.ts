import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordConfirmComponent } from './pwd-confirm.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';

const routes = [
  {
      path     : '',
      component: PasswordConfirmComponent, 
     
    },
  
      
];

@NgModule({
  declarations: [PasswordConfirmComponent],
  exports :[PasswordConfirmComponent, ComponentsModule, RouterModule],
  imports: [
    CommonModule, ComponentsModule, 
    RouterModule.forChild(routes),
  ]
})
export class PwdConfirmModule {
  constructor()
  {
    console.log('Password confirm start');
  }
 }
