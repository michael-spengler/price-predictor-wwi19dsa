import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTradeComponent } from './new-trade/new-trade.component';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TradeRoutingModule } from './trade-routing.module';


@NgModule({
  declarations: [NewTradeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TradeRoutingModule
  ]
})
export class TradeModule { }
