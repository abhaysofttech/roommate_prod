import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AgePipe, OrderByPipe, UniquePipe } from '../_service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LocationBackDirective } from '../_directive/location-back.directive';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
   AgePipe,
   OrderByPipe,
   UniquePipe,
   LocationBackDirective
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
    OrderByPipe,
    UniquePipe,
    LocationBackDirective
  ]
})
export class SharedModule { }
