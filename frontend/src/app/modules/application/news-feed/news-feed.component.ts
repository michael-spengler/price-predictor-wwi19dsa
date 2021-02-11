import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../../shared/services/blog-post/blog-post.service';
import { TradeService } from '../../../shared/services/trade/trade.service';
import { Trade } from '../../../shared/models/trade.model';
import { BlogPost } from '../../../shared/models/blog-post.model';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {

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
