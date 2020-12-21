import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonymousGuard } from './shared/guards/anonymous.guard';
import { SidenavComponent } from './template/sidenav/sidenav.component';

const routes: Routes = [
  {
    path: 'landing',
    loadChildren: () => import('./modules/landing/landing.module')
      .then(m => m.LandingModule)
  },
  {
    path: '',
    component: SidenavComponent,
    loadChildren: () => import('./template/sidenav.module')
      .then(m => m.SidenavModule)
  },
  // {
  //   path: '**',
  //   redirectTo: ''
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
