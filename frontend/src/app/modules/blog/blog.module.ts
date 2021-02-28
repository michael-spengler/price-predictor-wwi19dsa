import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { MaterialModule } from '../../material.module';
import { BlogRoutingModule } from './blog-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/components/shared.module';


@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    MaterialModule,
    BlogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedModule
  ]
})
export class BlogModule { }
