import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsComponent } from './us/us.component';
import { MaterialModule } from '../../material.module';
import { AboutRoutingModule } from './about-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [UsComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class AboutModule { }
