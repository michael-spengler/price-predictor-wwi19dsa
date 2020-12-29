import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BlogPost } from '../../../shared/models/blog-post.model';
import { retry } from 'rxjs/operators';

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

  constructor(private httpClient: HttpClient) {
    for (let i=0; i<100; i++) {
      this.posts.push(this.post);
    }
  }

  ngOnInit(): void {
    this.getPosts().subscribe(blogs => {
      for (let blog of blogs['blog entries']) {
        this.posts.push(blog);
        console.log(blog.date)
        console.log(typeof(blog.date))
      }
    });
  }

  getPosts() {
    return this.httpClient.get<{'blog entries' : BlogPost[]}>(environment.apiEndpoint + 'blog').pipe(retry(2));
  }
}
