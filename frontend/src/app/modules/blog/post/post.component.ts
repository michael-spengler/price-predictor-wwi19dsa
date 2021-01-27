import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BlogPost } from '../../../shared/models/blog-post.model';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {


  public createPostForm: FormGroup = this.formBuilder.group({
    title: [null, Validators.required],
    content: [null, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
  }

  public post() {
    const blogPost: BlogPost = {
      title: this.createPostForm.value.title,
      content: this.createPostForm.value.content,
      author: "its me"
    };
    try {
      const token = this.authService.getToken();
    
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      });

      let options = { headers: headers };
      
      this.httpClient.post(environment.apiEndpoint + 'blog',blogPost, options).subscribe(result => {
        this.router.navigate(['blog/feed']);
    }, error => {
        this._snackBar.open('Error. There are some troubles with this post. Please try again!', 'Close');
  
    });
    }catch (e)
    {
      this._snackBar.open('Error. No authorization token found. Please login again!', 'Close');
    }
   

   
  }

}
