import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ChartType } from 'angular-google-charts';
import { zip } from 'rxjs';
import { BlogPostService } from '../../../shared/services/blog-post/blog-post.service';
import { TradeService } from '../../../shared/services/trade/trade.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Trade } from '../../../shared/models/trade.model';
import { BlogPost } from '../../../shared/models/blog-post.model';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  allFeed: (BlogPost | Trade)[] = [];
  tradeFeed: Trade[] = [];
  blogPostFeed: BlogPost[] = [];
  username: String = "";
  user: User = <User>{};
  isLoading: Boolean = true;

  COLORS = [
    '#e65200',
    '#ef6d00',
    '#f57d00',
    '#fb8d00',
    '#ff9900',
    '#ffa826',
    '#ffb84d',
    '#ffcd80',
    '#ffe0b2',
    '#fff3e0',];

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private tradeService: TradeService,
    private userService: UserService,
    public authService: AuthService) { }

  trade_data: any;
  portfolio_data: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let username = params.get('username');
      if (username != null) {
        this.username = username;

        zip(
          this.userService.getUserByUsername(this.username),
          this.tradeService.getTradesByAuthor(this.username),
          this.blogPostService.getPostsByAuthor(this.username)
        ).subscribe(([user, trades, blogPosts]: [User, Trade[], BlogPost[]]) => {
          this.user = user;
          this.trade_data = this.genTradeData();
          this.portfolio_data = this.user.portfolio;

          this.blogPostFeed = blogPosts;
          this.sortByDate(this.blogPostFeed);

          this.tradeFeed = trades;
          this.sortByDate(this.tradeFeed);

          this.allFeed = this.blogPostFeed;
          this.allFeed = this.allFeed.concat(this.tradeFeed);
          this.sortByDate(this.allFeed);
          this.isLoading = false;
        });
      }
    });
  }


  genTradeData() {
    if (this.user.correct_trades != null && this.user.wrong_trades != null && this.user.trades != null) {
      let correct_trades = this.user.correct_trades;
      let wrong_trades = this.user.wrong_trades;
      let open_trades = this.user.trades - correct_trades - wrong_trades;
      return [
        [
          $localize`:Number of correct trades@@correctTradesID:Correct`, correct_trades
        ],
        [
          $localize`:Number of wrong trades@@wrongTradesID:Wrong`, wrong_trades
        ],
        [
          $localize`:Number of trades that are not evaluated@@openTradesID:Open`, open_trades
        ]
      ];
    } else {
      return [];
    }

  }

  private sortByDate(feed: (BlogPost | Trade)[]) {
    feed.sort((a, b) => {
      if (a.date != undefined && b.date != undefined) {
        return (a.date > b.date) ? -1 : 1
      } else return -1;
    });
  }

  async changeFollow() {
    if (this.user.follows) {
      this.userService.unfollowUser(this.user.username).subscribe(res => {
        this.user.follows = false;
      });
    } else {
      this.userService.followUser(this.user.username).subscribe(res => {
        this.user.follows = true;
      });
    }
  }

  trade_chart = {
    "type": ChartType.ColumnChart,
    "options": {
      "colors": this.COLORS,
      "bar": {
        "opacity": 0.2,
        "stroke-width": 4,
      },
      "backgroundColor": {
        "fill": "transparent",
      },
      "legend": {
        "position": "none"
      },
      "hAxis": {
        "baselineColor": '#FFF',
        "textStyle": {
          "color": "grey"
        }
      },
      "vAxis": {
        "textStyle": {
          "color": "grey"
        }
      }
    },
    "dynamicResize": true,
  }

  portfolio_chart = {
    "type": ChartType.PieChart,
    "options": {
      "colors": this.COLORS,
      "backgroundColor": {
        "fill": "transparent",
      },
      "legend": {
        "textStyle": {
          "color": "grey"
        }
      }
    },
    "dynamicResize": true,
  }


}
