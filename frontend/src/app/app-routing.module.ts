import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from './template/sidenav/sidenav.component';

const routes: Routes = [
  {
    path: 'about',
    component: SidenavComponent,
    loadChildren: () => import('./modules/about/about.module')
      .then(m => m.AboutModule)
  },
  {
    path: '',
    component: SidenavComponent,
    //loadChildren: () => import('./modules/application/application.module')
    loadChildren: () => import('./modules/landing/landing.module')
    //  .then(m => m.ApplicationModule)
    .then(m => m.LandingModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }