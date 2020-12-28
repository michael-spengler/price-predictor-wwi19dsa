import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

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
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
  }

  public post() {

  }

}
