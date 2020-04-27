import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from '.';
import { SharedModule } from '../_shared/shared.module';
import { LandingComponent } from './landing/landing.component';

@NgModule({
    declarations:[
        HomeComponent,
        LandingComponent
    ],

    imports:[
        SharedModule,
        CommonModule,
        FormsModule,
        IonicModule,
        PagesRoutingModule
    ]
})
export class PagesModule{}