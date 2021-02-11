import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../../models/blog-post.model';
import { Trade } from '../../models/trade.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  @Input() feedList: (BlogPost | Trade)[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}