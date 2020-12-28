import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { FeedComponent } from './feed/feed.component';
import { MaterialModule } from '../../material.module';
import { BlogPostComponent } from '../../shared/components/blog-post/blog-post.component';
import { BlogRoutingModule } from './blog-routing.module';


@NgModule({
  declarations: [PostComponent, FeedComponent, BlogPostComponent],
  imports: [
    CommonModule,
    MaterialModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
