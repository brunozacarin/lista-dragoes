import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragoesRoutingModule } from './dragoes-routing.module';
import { EditDragaoComponent } from './edit-dragao/edit-dragao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-date-picker';


@NgModule({
  declarations: [
    EditDragaoComponent
  ],
  imports: [
    CommonModule,
    DragoesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DpDatePickerModule
  ]
})
export class DragoesModule { }
