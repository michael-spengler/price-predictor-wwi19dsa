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

  public getAllPosts(): Observable<BlogPost[]> {
    return this.httpClient.get(environment.apiEndpoint + 'blog').pipe(
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
    return this.httpClient.get<BlogPost>(environment.apiEndpoint + 'blog/' + id.toString()).pipe(
      retry(2),
      map((post: BlogPost) => {
        post.interface = "blog-post";
        let date = post.date ? post.date : '';
        post.date = new Date(date);
        if (isNaN(post.date.getTime())) {
          post.date = new Date();
        }
        return post
      })
    );
  }
}
