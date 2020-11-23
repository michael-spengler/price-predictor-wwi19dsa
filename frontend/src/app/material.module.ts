import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';


const MaterialComponents = [
    MatButtonModule
];

@NgModule({
    imports: [ CommonModule, MaterialComponents ],
    exports: [ MaterialComponents ]
})

export class MaterialModule { }