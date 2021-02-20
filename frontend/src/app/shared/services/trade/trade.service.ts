import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Trade } from '../../models/trade.model';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor(private httpClient: HttpClient) { }

  TRADES_ENDPOINT = 'trades';

  public getAllTrades(): Observable<Trade[]> {
    return this.httpClient.get(environment.apiEndpoint + this.TRADES_ENDPOINT).pipe(
      retry(2),
      map((data: any) => {
        return data.data.filter((trade: Trade) => {
          return this.isTrade(this.parseToTrade(trade));
        });
      })
    );
  }

  public getTradesByAuthor(author: String): Observable<Trade[]> {
    return this.httpClient.get(environment.apiEndpoint + this.TRADES_ENDPOINT + '/' + author).pipe(
      retry(2),
      map((data: any) => {
        return data.data.filter((trade: Trade) => {
          return this.isTrade(this.parseToTrade(trade));
        })
      })
    );
  }

  public getTradeById(id: number): Observable<Trade> {
    return this.httpClient.get(environment.apiEndpoint + this.TRADES_ENDPOINT + '/' + id.toString()).pipe(
      retry(2),
      map((data: any) => {
        return this.parseToTrade(data.data);
      })
    );
  }

  private parseToDate(dateString: any): Date {
    let date = new Date(dateString);
    date = date ? date : new Date();
    return date;
  }

  private parseToTrade(data: any): Trade {
    data.interface = "trade";
    data.date = this.parseToDate(data.date);
    data.startdate = this.parseToDate(data.startdate);
    data.enddate = this.parseToDate(data.enddate);
    return data;
  }

  private isTrade(trade: Trade): Boolean {
    try {
      if (!isNaN(this.parseToDate(trade.date).getTime()) && !isNaN(trade.startdate.getTime()) && !isNaN(trade.enddate.getTime())) {
        return true
      } else {
        return false;
      }
    } catch (error) {
      return false
    }
  }
}
