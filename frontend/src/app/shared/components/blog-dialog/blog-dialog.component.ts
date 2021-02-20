import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlogPost } from '../../models/blog-post.model';
import { BlogPostService } from '../../services/blog-post/blog-post.service';

@Component({
  selector: 'app-blog-dialog',
  templateUrl: './blog-dialog.component.html',
  styleUrls: ['./blog-dialog.component.scss']
})
export class BlogDialogComponent implements OnInit {

  post = <BlogPost>{};
  isLoading: Boolean = true;
  constructor(@Inject(MAT_DIALOG_DATA) public id: number, private blogPostService: BlogPostService) { }

  ngOnInit() {
    this.blogPostService.getPostById(this.id).subscribe(post => {
      this.post = post;
      this.isLoading = false
    });
  }
}
