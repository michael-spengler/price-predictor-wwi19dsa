import { Component, Input } from '@angular/core';
import { Trade } from '../../models/trade.model';
import { MatDialog } from '@angular/material/dialog';
import { TradeDialogComponent } from '../trade-dialog/trade-dialog.component';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent {

  @Input() trade = <Trade>{};

  constructor(private dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(TradeDialogComponent, {
      data: this.trade.id
    });
  }

}
