import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonymousGuard } from 'src/app/shared/guards/anonymous.guard';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
  },
  {
    path: 'blog',
    loadChildren: () => import('../blog/blog.module')
      .then(m => m.BlogModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module')
      .then(m => m.AuthModule),
    canActivate: [AnonymousGuard],
  },
  {
    path: 'trade',
    loadChildren: () => import('../trade/trade.module')
      .then(m => m.TradeModule),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
