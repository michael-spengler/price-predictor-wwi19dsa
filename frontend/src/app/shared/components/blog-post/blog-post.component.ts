import { Component, Input } from '@angular/core';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent {
  posts: Array<BlogPost> = [];

  @Input() post: BlogPost = {
    'id': 0,
    'author': '',
    'content': '',
    'title': '',
    'date': new Date,
  };
  constructor() {
   }
}
