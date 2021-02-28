import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';
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
    zip(
      this.tradeService.getAllTrades(),
      this.blogPostService.getAllPosts()
    ).subscribe(([trades, blogPosts]: [Trade[], BlogPost[]]) => {
      this.feedList = blogPosts;
      this.feedList = this.feedList.concat(trades);
      this.sortByDate(this.feedList);
    });
  }

  private sortByDate(feed: (BlogPost | Trade)[]) {
    feed.sort((a, b) => {
      if (a.date != undefined && b.date != undefined) {
        return (a.date > b.date) ? -1 : 1
      } else return -1;
    });
  }
}
