import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../../models/blog-post.model';
import { Trade } from '../../models/trade.model';
import { BlogPostService } from '../../services/blog-post/blog-post.service';
import { TradeService } from '../../services/trade/trade.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  feedList: (BlogPost | Trade)[] = [];

  constructor(private blogPostService: BlogPostService, private tradeService: TradeService) { }

  ngOnInit(): void {
    this.tradeService.getAllTrades().subscribe(trades => {
      this.feedList = this.feedList.concat(trades);
    })
    this.blogPostService.getAllPosts().subscribe(blogs => {
      this.feedList = this.feedList.concat(blogs);
    });
  }
}