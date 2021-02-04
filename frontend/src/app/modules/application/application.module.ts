import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationRoutingModule } from './application-routing.module';
import { MaterialModule } from '../../material.module';
import { AuthModule } from '../auth/auth.module';
import { BlogModule } from '../blog/blog.module';
import { ProfileModule } from '../profile/profile.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    MaterialModule,
    AuthModule,
    BlogModule,
    ProfileModule
  ]
})
export class ApplicationModule { }
