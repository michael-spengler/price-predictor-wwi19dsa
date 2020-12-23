import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from '../../models/blog-post.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  date = new Date;
  posts: Array<BlogPost> = [];

  @Input() post1: BlogPost = {
    'id': 1,
    'author': 'me',
    'content': 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    'title': 'TITLE',
    'date': this.date,
  };
  constructor(private httpClient: HttpClient) {
    for (let i = 0; i < 50; i++) {
      this.posts.push(this.post1);
    }
   }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.httpClient.get(environment.apiEndpoint + '/blog').subscribe(resp => {
      console.log(resp);
    });
  }
}
