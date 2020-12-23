import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BlogPost } from '../../../shared/models/blog-post.model';

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
    this.getPosts();
  }

  getPosts() {
    this.httpClient.get<BlogPost[]>(environment.apiEndpoint + '/blog').subscribe(resp => {
      console.log(resp);
    });
  }
}
