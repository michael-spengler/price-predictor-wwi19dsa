import { Component, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  user = {
    "username": "Angela Merkel",
    "user_id": "bundesregierung",
    "join_date": "2008-02-01",
    "posts": 213,
    "trades": 361,
    "follower": 175,
    "correct_trades": 123,
    "wrong_trades": 22,
    "links": [
      {
        "name": "Facebook",
        "link": "https://www.facebook.com/Bundesregierung/"
      },
      {
        "name": "Twitter",
        "link": "https:///www.twitter.com/cdumerkel"
      }
    ]
  };

  constructor() {
    this.trade_data = this.genTradeData();
  }

  trade_data;

  genTradeData() {
    let correct_trades = this.user.correct_trades;
    let wrong_trades = this.user.wrong_trades;
    let open_trades = this.user.trades - correct_trades - wrong_trades;
    return [
      {
        "name": "Correct",
        "value": correct_trades,
      },
      {
        "name": "Wrong",
        "value": wrong_trades,
      },
      {
        "name": "Open",
        "value": open_trades,
      }
    ];
  }

  trade_chart = {
    "type": ChartType.ColumnChart,
    "data": [
      [
        "Correct", 123
      ],
      [
        "Wrong", 243
      ],
      [
        "Open", 13
      ]
    ],
    "options": {
      "backgroundColor": {
        "fill": "transparent",
      },
      "legend": {
        "textStyle": {
          "color": "white"
        }
      }
    },
    "dynamicResize": true,
  }

  portfolio_chart = {
    "type": ChartType.PieChart,
    "data": [
      [
        "BTC", 32100
      ],
      [
        "ETH", 4200
      ],
      [
        "USD", 10123.23
      ],
      [
        "EUR", 5012.123
      ]
    ],
    "options": {
      "backgroundColor": {
        "fill": "transparent",
      },
      "legend": {
        "textStyle": {
          "color": "white"
        }
      }
    },
    "dynamicResize": true,
  }
}
