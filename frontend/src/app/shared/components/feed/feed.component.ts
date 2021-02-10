import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../../models/blog-post.model';
import { BlogPostService } from '../../services/blog-post/blog-post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  posts: BlogPost[] = [];

  constructor(private blogPostService: BlogPostService) {}

  ngOnInit(): void {
    this.blogPostService.getAllPosts().subscribe(blogs => {
      this.posts = blogs;
    });
  }
}
