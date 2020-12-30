import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationRoutingModule } from './application-routing.module';
import { MaterialModule } from '../../material.module';
import { AuthModule } from '../auth/auth.module';
import { BlogModule } from '../blog/blog.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    MaterialModule,
    AuthModule,
    BlogModule
  ]
})
export class ApplicationModule { }
