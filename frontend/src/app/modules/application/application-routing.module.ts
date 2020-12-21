import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonymousGuard } from 'src/app/shared/guards/anonymous.guard';

const routes: Routes = [
  {
    path: '',
  },
  {
    path: 'feed',
    loadChildren: () => import('../feed/feed.module')
      .then(m => m.FeedModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module')
      .then(m => m.AuthModule),
    canActivate: [AnonymousGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
