import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostComponent } from '../../shared/components/blog-post/blog-post.component';
import { FeedRoutingModule } from './feed-routing.module';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FeedComponent } from './feed/feed.component';


@NgModule({
  declarations: [BlogPostComponent, FeedComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FeedRoutingModule,
    FlexLayoutModule
  ]
})
export class FeedModule { }
