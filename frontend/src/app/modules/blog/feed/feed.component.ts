import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BlogPost } from '../../../shared/models/blog-post.model';
import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  date = new Date();
  posts: BlogPost[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getPosts().subscribe(blogs => {
      this.posts = blogs;
    });
  }

  getPosts(): Observable<BlogPost[]> {
    return this.httpClient.get(environment.apiEndpoint + 'blog').pipe(
      retry(2),
      map((data: any) => {
        return data['blog entries'].filter((post: BlogPost) => {
          try {
            let date = post.date ? post.date : '';
            post.date = new Date(date);
            if (!isNaN(post.date.getTime())) {
              return true
            } else {
              return false;
            }
          } catch (error) {
            return false
          }
        }
        );
      })
    );
  }
}
