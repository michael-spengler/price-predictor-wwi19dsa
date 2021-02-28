import { Component, Input, OnInit } from '@angular/core';
import { Trade } from '../../models/trade.model';
import { MatDialog } from '@angular/material/dialog';
import { TradeDialogComponent } from '../trade-dialog/trade-dialog.component';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {

  @Input() trade = <Trade>{};

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.setCurrencyAcronyms();
  }
  
  openDialog() {
    this.dialog.open(TradeDialogComponent, {
      data: this.trade.id
    });
  }

  private setCurrencyAcronyms() {
    const reg = /\(([^)]+)\)/;
    const fiat_currency= reg.exec(this.trade.fiatcurrency);
    const crypto_currency = reg.exec(this.trade.cryptocurrency);
    this.trade.fiatcurrency = fiat_currency ? fiat_currency[1] : this.trade.fiatcurrency;
    this.trade.cryptocurrency = crypto_currency ? crypto_currency[1] : this.trade.cryptocurrency;
  }

}
