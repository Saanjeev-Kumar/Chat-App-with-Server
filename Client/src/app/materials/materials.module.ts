import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';


const bookmaterialModules = [
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatRadioModule,
  MatSelectModule,
  MatIconModule,
  
]

@NgModule({
  imports: [ bookmaterialModules ],
  exports: [ bookmaterialModules ]
})
export class MaterialsModule { }

