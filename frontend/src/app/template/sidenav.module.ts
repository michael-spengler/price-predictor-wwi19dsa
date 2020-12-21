import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavRoutingModule } from './sidenav-routing.module';
import { MaterialModule } from '../material.module';
import { AuthModule } from '../modules/auth/auth.module';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    SidenavRoutingModule,
    MaterialModule,
    AuthModule
  ]
})
export class SidenavModule { }
