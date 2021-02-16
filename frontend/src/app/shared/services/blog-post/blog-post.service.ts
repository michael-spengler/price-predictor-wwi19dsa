import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BlogPost } from '../../models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private httpClient: HttpClient) { }

  BLOG_POST_ENDPOINT = 'blog';

  public getAllPosts(): Observable<BlogPost[]> {
    return this.httpClient.get(environment.apiEndpoint + this.BLOG_POST_ENDPOINT).pipe(
      retry(2),
      map((data: any) => {
        return data.data.filter((post: BlogPost) => {
          try {
            post.interface = "blog-post";
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

  public getPostById(id: number): Observable<BlogPost> {
    return this.httpClient.get(environment.apiEndpoint + this.BLOG_POST_ENDPOINT + '/' + id.toString()).pipe(
      retry(2),
      map((data: any) => {
        let post = data.data;
        post.interface = "blog-post";
        let date = post.date ? post.date : '';
        post.date = new Date(date);
        return post;
      })
    );
  }

  public getPostsByAuthor(author: String): Observable<BlogPost[]> {
    return this.httpClient.get(environment.apiEndpoint + this.BLOG_POST_ENDPOINT + '/' + author).pipe(
      retry(2),
      map((data: any) => {
        return data.data.filter((post: BlogPost) => {
          try {
            post.interface = "blog-post";
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
