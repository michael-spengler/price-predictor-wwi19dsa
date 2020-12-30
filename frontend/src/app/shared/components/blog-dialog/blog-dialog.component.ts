import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'app-blog-dialog',
  templateUrl: './blog-dialog.component.html',
  styleUrls: ['./blog-dialog.component.scss']
})
export class BlogDialogComponent implements OnInit {

  post = <BlogPost>{};
  isLoading: Boolean = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private httpClient: HttpClient) { }

  ngOnInit() {
    this.getPost().subscribe(post => {
      this.post = post;
      this.isLoading = false
    });
  }

  getPost(): Observable<BlogPost> {
    return this.httpClient.get<BlogPost>(environment.apiEndpoint + 'blog/' + this.data.toString()).pipe(
      retry(2),
      map((post: BlogPost) => {
        post.date = new Date(post.date);
        if (isNaN(post.date.getTime())) {
          post.date = new Date();
        }
        return post
      })
    );
  }

}
