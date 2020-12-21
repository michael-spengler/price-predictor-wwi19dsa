import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationRoutingModule } from './application-routing.module';
import { MaterialModule } from '../../material.module';
import { AuthModule } from '../auth/auth.module';
import { FeedModule } from '../feed/feed.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    MaterialModule,
    AuthModule,
    FeedModule
  ]
})
export class ApplicationModule { }
