import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsComponent } from './us/us.component';
const routes: Routes = [
    {
        path: 'us',
        component: UsComponent
    },
    {
        path: '',
        component: UsComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
