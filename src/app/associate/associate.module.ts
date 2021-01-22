import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssocMainModule } from './assoc-main/assoc-main.module';
import { AssocAuthModule } from './assoc-auth/assoc-auth.module';
import { Routes } from '@angular/router';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, AssocMainModule, AssocAuthModule, ComponentsModule
  ]
})
export class AssociateModule { 
  constructor()
  {
    console.log('Assoc Module loaded');
  }
}
