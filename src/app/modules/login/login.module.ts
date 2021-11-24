import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginModuleComponent } from './login.module.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    LoginModuleComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule
  ]
})
export class LoginModule { }
