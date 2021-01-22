import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';


const routes = [
  {
      path     : '',
      component: LoginComponent, 
     
    },
  
      
];

@NgModule({
  declarations: [LoginComponent],
  exports :[LoginComponent, ComponentsModule, RouterModule],
  imports: [
    CommonModule, ComponentsModule, 
    RouterModule.forChild(routes),
  ]
})
export class LoginModule { }
