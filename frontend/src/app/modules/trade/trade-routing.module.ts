import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { NewTradeComponent } from './new-trade/new-trade.component';

const routes: Routes = [
    {
        path: 'newTrade',
        component: NewTradeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TradeRoutingModule { }