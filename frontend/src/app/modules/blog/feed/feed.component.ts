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
  post: BlogPost = {
    'id': 1,
    'author': 'You',
    'content': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    'title': 'TITLE',
    'date': this.date,
  };
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
          post.date = new Date(post.date);
          if (!isNaN(post.date.getTime())) {
            return true
          } else {
            return false;
          }
        }
        );
      })
    );
  }
}
