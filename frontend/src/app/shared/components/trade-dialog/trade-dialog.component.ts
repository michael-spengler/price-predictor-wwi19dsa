import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Trade } from '../../models/trade.model';
import { TradeService } from '../../services/trade/trade.service';

@Component({
  selector: 'app-trade-dialog',
  templateUrl: './trade-dialog.component.html',
  styleUrls: ['./trade-dialog.component.scss']
})
export class TradeDialogComponent implements OnInit {

  trade = <Trade>{};
  isLoading: Boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public id: number, private tradeService: TradeService) { }

  ngOnInit(): void {
    this.tradeService.getTradeById(this.id).subscribe(trade => {
      this.trade = trade;
      this.isLoading = false;
    });
  }

}
