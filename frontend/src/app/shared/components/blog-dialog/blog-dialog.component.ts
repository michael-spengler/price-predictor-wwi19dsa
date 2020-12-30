import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-blog-dialog',
  templateUrl: './blog-dialog.component.html',
  styleUrls: ['./blog-dialog.component.scss']
})
export class BlogDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: number) { }

}
