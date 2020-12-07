import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { MaterialModule } from './../../../material.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [AuthFormComponent, LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
  ]
})
export class AuthModule { }