import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ProfileRoutingModule,
    FlexLayoutModule
  ]
})
export class ProfileModule { }
