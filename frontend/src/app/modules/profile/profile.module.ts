import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GoogleChartsModule } from 'angular-google-charts';
import { SharedModule } from '../../shared/components/shared.module';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ProfileRoutingModule,
    FlexLayoutModule,
    GoogleChartsModule,
    SharedModule
  ]
})
export class ProfileModule { }
