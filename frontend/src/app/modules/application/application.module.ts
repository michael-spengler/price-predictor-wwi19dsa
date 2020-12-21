import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationRoutingModule } from './application-routing.module';
import { MaterialModule } from '../../material.module';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    MaterialModule,
    AuthModule
  ]
})
export class ApplicationModule { }
