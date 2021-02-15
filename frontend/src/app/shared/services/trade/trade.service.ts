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

  public getAllTrades(): Observable<Trade[]> {
    return this.httpClient.get(environment.apiEndpoint + 'trades').pipe(
      retry(2),
      map((data: any) => {
        return data.data.filter((trade: Trade) => {
          try {
            trade.interface = "trade";
            trade.date = this.parseToDate(trade.date);
            trade.startdate = this.parseToDate(trade.startdate);
            trade.enddate = this.parseToDate(trade.enddate);

            if (!isNaN(trade.date.getTime()) && !isNaN(trade.startdate.getTime()) && !isNaN(trade.enddate.getTime())) {
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

  private parseToDate(dateString: any): Date {
    let date = new Date(dateString);
    date = date ? date : new Date();
    return date;
  }
}
