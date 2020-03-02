import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AgePipe, OrderByPipe } from '../_service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
   AgePipe,
   OrderByPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // IonicSelectableModule,
    RouterModule,
    // NgbModule,
  ],
  exports:[
    LoadingSpinnerComponent,
    AgePipe,
    OrderByPipe
  ]
})
export class SharedModule { }
