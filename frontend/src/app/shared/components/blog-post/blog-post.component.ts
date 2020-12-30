import { Component, Input } from '@angular/core';
import { BlogPost } from '../../models/blog-post.model';
import { MatDialog } from '@angular/material/dialog';
import { BlogDialogComponent } from '../blog-dialog/blog-dialog.component';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent {

  @Input() post = <BlogPost>{};

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(BlogDialogComponent, {
      data: this.post.id
    });
  }
}
