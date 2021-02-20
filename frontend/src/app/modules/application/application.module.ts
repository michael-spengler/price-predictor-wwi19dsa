import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationRoutingModule } from './application-routing.module';
import { MaterialModule } from '../../material.module';
import { AuthModule } from '../auth/auth.module';
import { BlogModule } from '../blog/blog.module';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../../shared/components/shared.module';
import { NewsFeedComponent } from './news-feed/news-feed.component';

@NgModule({
  declarations: [NewsFeedComponent],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    MaterialModule,
    AuthModule,
    BlogModule,
    SharedModule,
    ProfileModule
  ]
})
export class ApplicationModule { }
