import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.modules';
import { SharedModule } from 'src/app/_shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileDetailsComponent, NotificationComponent } from '.';

@NgModule({
    declarations: [
        ProfileDetailsComponent,
        NotificationComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        ProfileRoutingModule,
       
    ]
})
export class ProfileModule { }