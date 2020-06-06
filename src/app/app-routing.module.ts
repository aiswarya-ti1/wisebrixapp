import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports:[AuthModule],
  exports: [RouterModule, AuthModule]
})
export class AppRoutingModule { }