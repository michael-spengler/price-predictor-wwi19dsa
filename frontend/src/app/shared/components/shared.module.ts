import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from '../../shared/components/feed/feed.component';
import { MaterialModule } from '../../material.module';
import { BlogPostComponent } from '../../shared/components/blog-post/blog-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BlogDialogComponent } from '../../shared/components/blog-dialog/blog-dialog.component';
import { TradeComponent } from './trade/trade.component';
import { TradeDialogComponent } from './trade-dialog/trade-dialog.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [FeedComponent, BlogPostComponent, BlogDialogComponent, TradeComponent, TradeDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [
    FeedComponent
  ]
})
export class SharedModule { }
